import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Icon, Button, IconButton, Pill, initials } from './Primitives';
import { CLIENTS, PROPERTIES, findClient, findProperty, fmtTime12 } from './data';

export const KIND_META = {
  visit: { label: 'Visita',          color: 'var(--accent-500)',  cls: 'ev-visit' },
  rent:  { label: 'Cobranza',        color: 'var(--info-500)',    cls: 'ev-rent' },
  meet:  { label: 'Reunión',         color: 'var(--purple-500)',  cls: 'ev-meet' },
  call:  { label: 'Llamada',         color: 'var(--warning-500)', cls: 'ev-call' },
  sign:  { label: 'Firma de contrato', color: 'var(--success-500)', cls: 'ev-sign' },
};

export function EventPopover({ event, anchor, onClose, onEdit, onReschedule, onCancel, onDelete, onOpenClient, onOpenProperty }) {
  if (!event) return null;
  const meta = KIND_META[event.kind];
  const client = findClient(event.clientId);
  const prop = findProperty(event.propId);

  const ref = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0, opacity: 0 });
  useEffect(() => {
    if (!anchor || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const w = r.width, h = r.height;
    const margin = 8;
    let left = anchor.right + margin;
    let top = anchor.top;
    if (left + w > window.innerWidth - margin) left = Math.max(margin, anchor.left - w - margin);
    if (top + h > window.innerHeight - margin) top = Math.max(margin, window.innerHeight - h - margin);
    if (top < margin) top = margin;
    setPos({ left, top, opacity: 1 });
  }, [anchor]);

  const dateLabel = (() => {
    const [y,m,d] = event.date.split('-').map(Number);
    const dt = new Date(y, m-1, d);
    const dows = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
    return `${dows[dt.getDay()].replace(/^./, c=>c.toUpperCase())}, ${d} de ${['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'][m-1]}`;
  })();

  return (
    <Fragment>
      <div className="popover-shroud" onClick={onClose} />
      <div className="popover" ref={ref} style={{ left: pos.left, top: pos.top, opacity: pos.opacity }}>
        <div className="popover-head">
          <IconButton name="edit" title="Editar" onClick={() => onEdit(event)} />
          <IconButton name="trash" title="Eliminar" onClick={() => onDelete(event)} />
          <IconButton name="mail" title="Enviar correo" />
          <IconButton name="more" title="Más" />
          <span className="spacer" />
          <IconButton name="x" title="Cerrar" onClick={onClose} />
        </div>
        <div className="popover-body">
          <div className="popover-title">
            <span className="swatch" style={{ background: meta.color }} />
            <h3>{event.title}</h3>
          </div>
          <div className="popover-when">
            {dateLabel} · {fmtTime12(event.start)} – {fmtTime12(event.end)}
          </div>

          {prop && (
            <div className="popover-row">
              <Icon name="mapPin" size={16} />
              <div className="val">
                <a href="#" onClick={(e)=>{e.preventDefault(); onOpenProperty && onOpenProperty(prop);}}>{prop.addr}</a>
                <span className="sub">{prop.neigh} · {prop.type} {prop.rooms !== '—' && `· ${prop.rooms}`} · {prop.m2} m²</span>
              </div>
            </div>
          )}

          {client && (
            <div className="popover-row">
              <Icon name="users" size={16} />
              <div className="val">
                <div className="popover-attendee">
                  <span className="av">{initials(client.name)}</span>
                  <div>
                    <div className="name">
                      <a href="#" onClick={(e)=>{e.preventDefault(); onOpenClient && onOpenClient(client);}}>{client.name}</a>
                      <Pill kind={event.status === 'confirmed' ? 'paid' : event.status === 'cancelled' ? 'cancelled' : 'pending'}>{event.status === 'confirmed' ? 'Confirmado' : event.status === 'cancelled' ? 'Cancelado' : 'Por confirmar'}</Pill>
                    </div>
                    <div className="meta">{client.tags.join(' · ')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {client && (
            <div className="popover-row">
              <Icon name="phone" size={16} />
              <div className="val">
                <a className="tel" href={`tel:${client.phone}`}>{client.phone}</a>
                <span className="sub">{client.email}</span>
              </div>
            </div>
          )}

          <div className="popover-row">
            <Icon name="user" size={16} />
            <div className="val">
              {event.agent}
              <span className="sub">Agente asignado</span>
            </div>
          </div>

          {event.notes && (
            <div className="popover-row">
              <Icon name="file" size={16} />
              <div className="val" style={{ fontSize: 12, color: 'var(--fg-secondary)' }}>{event.notes}</div>
            </div>
          )}

          <div className="popover-row">
            <Icon name="calendar" size={16} />
            <div className="val" style={{ display:'flex', alignItems:'center', gap: 6, fontSize: 12, color: 'var(--fg-secondary)' }}>
              <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:'2px 7px',background:'var(--success-50)',color:'var(--success-700)',borderRadius:4,fontWeight:500}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'var(--success-500)'}}></span>
                Sincronizado con Google Calendar
              </span>
            </div>
          </div>
        </div>
        <div className="popover-actions">
          <Button kind="secondary" size="sm" icon="refresh" onClick={() => onReschedule(event)}>Reprogramar</Button>
          <Button kind="secondary" size="sm" icon="edit" onClick={() => onEdit(event)}>Modificar</Button>
          <Button kind="danger" size="sm" icon="x" onClick={() => onCancel(event)}>Cancelar</Button>
        </div>
      </div>
    </Fragment>
  );
}

export function EventEditor({ event, mode, onClose, onSave }) {
  const [form, setForm] = useState(() => event || {
    title: '', kind: 'visit', date: '2026-05-12', start: '10:00', end: '11:00',
    clientId: '', propId: '', agent: 'M. Pereyra', status: 'pending', notes: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const titles = { create: 'Nuevo evento', edit: 'Modificar evento', reschedule: 'Reprogramar evento' };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{titles[mode] || 'Evento'}</h3>
          <span className="close"><IconButton name="x" onClick={onClose} /></span>
        </div>
        <div className="modal-body">
          {mode !== 'reschedule' && (
            <Fragment>
              <div className="field">
                <label>Título</label>
                <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Visita · Av. Cabildo 2350" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Tipo</label>
                  <select value={form.kind} onChange={e => set('kind', e.target.value)}>
                    <option value="visit">Visita</option>
                    <option value="call">Llamada</option>
                    <option value="meet">Reunión</option>
                    <option value="sign">Firma de contrato</option>
                    <option value="rent">Cobranza</option>
                  </select>
                </div>
                <div className="field">
                  <label>Agente</label>
                  <select value={form.agent} onChange={e => set('agent', e.target.value)}>
                    <option>M. Pereyra</option>
                    <option>J. Suárez</option>
                    <option>L. Vélez</option>
                  </select>
                </div>
              </div>
            </Fragment>
          )}
          <div className="field-row">
            <div className="field">
              <label>Fecha</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div className="field-row" style={{ gap: 8 }}>
              <div className="field">
                <label>Inicio</label>
                <input type="time" value={form.start} onChange={e => set('start', e.target.value)} />
              </div>
              <div className="field">
                <label>Fin</label>
                <input type="time" value={form.end} onChange={e => set('end', e.target.value)} />
              </div>
            </div>
          </div>
          {mode !== 'reschedule' && (
            <Fragment>
              <div className="field-row">
                <div className="field">
                  <label>Cliente</label>
                  <select value={form.clientId || ''} onChange={e => set('clientId', e.target.value || null)}>
                    <option value="">— Sin cliente —</option>
                    {CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Propiedad</label>
                  <select value={form.propId || ''} onChange={e => set('propId', e.target.value || null)}>
                    <option value="">— Sin propiedad —</option>
                    {PROPERTIES.map(p => <option key={p.id} value={p.id}>{p.addr}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Notas</label>
                <textarea value={form.notes || ''} onChange={e => set('notes', e.target.value)} placeholder="Detalles para el agente o el cliente..." />
              </div>
            </Fragment>
          )}
          {mode === 'reschedule' && (
            <div style={{padding:'10px 12px',background:'var(--accent-50)',border:'1px solid var(--accent-100)',borderRadius:7,fontSize:12,color:'var(--accent-700)',marginTop:4}}>
              Se enviará una notificación al cliente con la nueva fecha y hora.
            </div>
          )}
        </div>
        <div className="modal-foot">
          <Button kind="ghost" size="sm" onClick={onClose}>Cancelar</Button>
          <Button kind="primary" size="sm" icon="check" onClick={() => onSave(form)}>
            {mode === 'create' ? 'Crear evento' : mode === 'reschedule' ? 'Reprogramar' : 'Guardar cambios'}
          </Button>
        </div>
      </div>
    </div>
  );
}
