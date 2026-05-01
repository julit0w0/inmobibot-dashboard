import React from 'react';
import { Icon, Button, IconButton, Pill, pushToast } from './Primitives';
import { getEvents, PROPERTIES, findClient, findProperty, fmtTime12 } from './data';
import { KIND_META } from './EventPopover';

function KpiCard({ label, value, delta, trend, accent }) {
  return (
    <div className="kpi">
      <span className="kpi-label">{label}</span>
      <span className="kpi-value" style={accent ? { color: 'var(--accent-500)' } : null}>{value}</span>
      {delta && (
        <span className={`kpi-delta ${trend || ''}`}>
          {trend === 'up' && <Icon name="arrowUp" size={12} />}
          {trend === 'down' && <Icon name="arrowDown" size={12} />}
          {delta}
        </span>
      )}
    </div>
  );
}

export default function Dashboard({ onNav, onOpenEvent, onOpenClient }) {
  const events = getEvents();
  const today = '2026-05-12';
  const todayEvents = events
    .filter(e => e.date === today && e.status !== 'cancelled')
    .sort((a,b) => a.start.localeCompare(b.start));

  return (
    <div className="page-view">
      <div className="page-h">
        <div>
          <h1>Buen día, María</h1>
          <div className="sub">Martes 12 de mayo · {todayEvents.length} eventos en la agenda de hoy</div>
        </div>
        <div className="page-h-actions">
          <Button kind="secondary" icon="filter" size="sm">Este mes</Button>
          <Button kind="primary" icon="plus" size="sm" onClick={() => onNav('calendar')}>Agendar visita</Button>
        </div>
      </div>

      <div className="page-kpis">
        <div className="kpi-grid">
          <KpiCard label="Visitas hoy" value={todayEvents.filter(e=>e.kind==='visit').length} delta="+1 vs ayer" trend="up" />
          <KpiCard label="Cobranzas del mes" value="$ 2.840.000" delta="78% del objetivo" trend="up" />
          <KpiCard label="Propiedades disponibles" value={PROPERTIES.filter(p=>p.status==='available').length} delta={`de ${PROPERTIES.length} en cartera`} />
          <KpiCard label="Contratos por vencer (30d)" value="8" delta="2 sin renovar" trend="down" accent />
        </div>
      </div>

      <div className="page-body">
      <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr',gap:20}}>
        <div>
          <div className="section-h" style={{margin:'0 0 12px'}}>
            <h2>Agenda de hoy</h2>
            <span className="count">{todayEvents.length} eventos</span>
            <div className="actions">
              <Button kind="ghost" size="sm" onClick={() => onNav('calendar')}>Ver calendario →</Button>
            </div>
          </div>
          <div className="surface">
            <table className="tbl">
              <thead><tr>
                <th>Hora</th><th>Cliente</th><th>Propiedad</th><th>Agente</th><th>Estado</th><th></th>
              </tr></thead>
              <tbody>
                {todayEvents.map(e => {
                  const c = findClient(e.clientId);
                  const p = findProperty(e.propId);
                  const meta = KIND_META[e.kind];
                  return (
                    <tr key={e.id} onClick={(ev) => onOpenEvent(e, ev.currentTarget.getBoundingClientRect())}>
                      <td className="tabular" style={{whiteSpace:'nowrap'}}>
                        <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
                          <span style={{width:6,height:6,borderRadius:'50%',background:meta.color}}></span>
                          {fmtTime12(e.start)}
                        </span>
                      </td>
                      <td>{c ? c.name : <span className="muted">—</span>}</td>
                      <td className="muted">{p ? p.addr : e.title.replace(/^[^·]+·\s*/,'')}</td>
                      <td className="muted">{e.agent}</td>
                      <td>{e.status === 'confirmed' ? <Pill kind="paid">Confirmada</Pill> : <Pill kind="pending">Por confirmar</Pill>}</td>
                      <td><div className="row-actions"><IconButton name="phone" /><IconButton name="more" /></div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="section-h">
            <h2>Actividad reciente</h2>
          </div>
          <div className="surface activity">
            <div className="activity-row"><span className="icon"><Icon name="check" size={14} style={{color:'var(--success-500)'}}/></span><div className="text"><b>Pago registrado</b> · Contrato C-1042 — $ 285.000 <span className="when">· hace 12 min</span></div></div>
            <div className="activity-row"><span className="icon"><Icon name="contract" size={14}/></span><div className="text"><b>Contrato firmado</b> · Soler 4120 con R. Caamaño <span className="when">· hace 2 h</span></div></div>
            <div className="activity-row"><span className="icon"><Icon name="users" size={14}/></span><div className="text"><b>Nuevo lead</b> · L. Mansilla — interesada en Palermo <span className="when">· hace 4 h</span></div></div>
            <div className="activity-row"><span className="icon"><Icon name="calendar" size={14}/></span><div className="text"><b>Visita reprogramada</b> · Olleros 1850 PH movida al 15/05 <span className="when">· hace 6 h</span></div></div>
            <div className="activity-row"><span className="icon"><Icon name="building" size={14}/></span><div className="text"><b>Propiedad publicada</b> · Bulnes 1560 4°D <span className="when">· ayer</span></div></div>
          </div>
        </div>

        <div>
          <div className="section-h" style={{margin:'0 0 12px'}}>
            <h2>Próximos vencimientos</h2>
          </div>
          <div className="surface" style={{padding:'4px 0'}}>
            {[
              { name: 'C-1042 · Caamaño',  prop: 'Soler 4120 5°B', due: '18 may', amount: '$ 410.000', kind: 'expiring' },
              { name: 'C-0998 · Sánchez',  prop: 'Gascón 1240',    due: '24 may', amount: '$ 195.000', kind: 'pending' },
              { name: 'C-1015 · Donofrio', prop: 'Bulnes 1560',    due: '02 jun', amount: '$ 305.000', kind: 'pending' },
              { name: 'C-0920 · Mansilla', prop: 'Cabildo 2350',   due: '08 jun', amount: '$ 285.000', kind: 'pending' },
            ].map((r, i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',borderBottom: i<3 ? '1px solid var(--border-subtle)' : 'none',cursor:'pointer'}}>
                <Icon name="contract" size={14} style={{color:'var(--fg-tertiary)'}} />
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500}}>{r.name}</div>
                  <div style={{fontSize:11,color:'var(--fg-tertiary)'}}>{r.prop} · vence {r.due}</div>
                </div>
                <div className="tabular" style={{fontSize:13,fontWeight:500}}>{r.amount}</div>
              </div>
            ))}
          </div>

          <div className="section-h">
            <h2>Embudo de leads</h2>
          </div>
          <div className="surface" style={{padding:14}}>
            {[
              { stage: 'Nuevos contactos',   count: 24, pct: 100 },
              { stage: 'Visita agendada',    count: 14, pct: 58 },
              { stage: 'Visita realizada',   count: 9,  pct: 38 },
              { stage: 'Oferta',             count: 4,  pct: 17 },
              { stage: 'Contrato firmado',   count: 2,  pct: 8 },
            ].map((s,i) => (
              <div key={i} style={{marginBottom:i<4?10:0}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontSize:12,color:'var(--fg-secondary)'}}>{s.stage}</span>
                  <span style={{fontSize:12,fontWeight:600}} className="tabular">{s.count}</span>
                </div>
                <div style={{height:6,background:'var(--gray-100)',borderRadius:3,overflow:'hidden'}}>
                  <div style={{width:`${s.pct}%`,height:'100%',background:'var(--accent-500)',opacity:0.4 + (s.pct/200)}}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-h">
            <h2>Equipo</h2>
          </div>
          <div className="surface" style={{padding:'4px 0'}}>
            {[
              { name: 'M. Pereyra', visits: 3, deals: 2, init: 'MP', color: 'var(--accent-500)' },
              { name: 'J. Suárez',  visits: 2, deals: 1, init: 'JS', color: 'var(--info-500)' },
              { name: 'L. Vélez',   visits: 1, deals: 0, init: 'LV', color: 'var(--purple-500)' },
            ].map((a,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',borderBottom: i<2 ? '1px solid var(--border-subtle)' : 'none'}}>
                <span style={{width:28,height:28,borderRadius:'50%',background:a.color,color:'white',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600}}>{a.init}</span>
                <div style={{flex:1,fontSize:13}}>{a.name}</div>
                <div style={{fontSize:11,color:'var(--fg-tertiary)'}}>{a.visits} visitas · {a.deals} cierres</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
