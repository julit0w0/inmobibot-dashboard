// Shared mock data for the prototype: clients, properties, events.

export const PROPERTIES = [
  { id: 'p1', addr: 'Av. Cabildo 2350', neigh: 'Belgrano',  type: 'Departamento', rooms: '2 amb', m2: 58, status: 'available', price: 285000, agent: 'M. Pereyra', operation: 'rent', baths: 1, parking: 0, photo: '#dbe3e6' },
  { id: 'p2', addr: 'Soler 4120 5°B',   neigh: 'Palermo',   type: 'Departamento', rooms: '3 amb', m2: 72, status: 'rented',    price: 410000, agent: 'J. Suárez', operation: 'rent', baths: 2, parking: 1, photo: '#e6dcd2' },
  { id: 'p3', addr: 'Olleros 1850 PH',  neigh: 'Colegiales',type: 'PH',           rooms: '3 amb', m2: 84, status: 'available', price: 520000, agent: 'M. Pereyra', operation: 'rent', baths: 2, parking: 0, photo: '#dde3d8' },
  { id: 'p4', addr: 'Juncal 2890 9°A',  neigh: 'Recoleta',  type: 'Departamento', rooms: '4 amb', m2: 124, status: 'sale',     price: 285000, agent: 'J. Suárez', operation: 'sale', currency: 'USD', baths: 3, parking: 2, photo: '#e2d8df' },
  { id: 'p5', addr: 'Gascón 1240 2°C',  neigh: 'Almagro',   type: 'Departamento', rooms: '1 amb', m2: 38, status: 'rented',    price: 195000, agent: 'L. Vélez',   operation: 'rent', baths: 1, parking: 0, photo: '#d8dee3' },
  { id: 'p6', addr: 'Av. Santa Fe 3110',neigh: 'Palermo',   type: 'Local',        rooms: '—',     m2: 96, status: 'available', price: 750000, agent: 'M. Pereyra', operation: 'rent', baths: 1, parking: 0, photo: '#e2dfd5' },
  { id: 'p7', addr: 'Pueyrredón 1502',  neigh: 'Recoleta',  type: 'Oficina',      rooms: '—',     m2: 64, status: 'available', price: 380000, agent: 'L. Vélez',   operation: 'rent', baths: 1, parking: 0, photo: '#dad9df' },
  { id: 'p8', addr: 'Echeverría 2240',  neigh: 'Belgrano',  type: 'Casa',         rooms: '5 amb', m2: 220, status: 'sale',     price: 410000, agent: 'J. Suárez', operation: 'sale', currency: 'USD', baths: 3, parking: 2, photo: '#dee0d6' },
  { id: 'p9', addr: 'Charcas 4488',     neigh: 'Palermo',   type: 'Departamento', rooms: '2 amb', m2: 52, status: 'reserved',  price: 320000, agent: 'M. Pereyra', operation: 'rent', baths: 1, parking: 0, photo: '#dfdcdb' },
  { id: 'p10',addr: 'Bulnes 1560 4°D',  neigh: 'Palermo',   type: 'Departamento', rooms: '2 amb', m2: 56, status: 'available', price: 305000, agent: 'L. Vélez',   operation: 'rent', baths: 1, parking: 1, photo: '#dee5e2' },
];

export const CLIENTS = [
  { id: 'c1', name: 'Lucía Mansilla',   role: 'prospect', tags: ['Búsqueda activa','Palermo'], phone: '+54 11 5891 4422', email: 'lucia.mansilla@mail.com', dni: '34.221.908', since: '12 mar 2026', agent: 'M. Pereyra', notes: 'Busca 2 amb hasta $310.000. Mascota chica.', interest: ['p1','p10','p3'], visits: 4, lastContact: 'hace 12 min' },
  { id: 'c2', name: 'Roberto Caamaño',  role: 'tenant',  tags: ['Inquilino','Palermo'], phone: '+54 11 6233 7188', email: 'r.caamano@mail.com', dni: '28.119.402', since: '04 may 2024', agent: 'J. Suárez', notes: 'Renueva contrato Soler 4120.', interest: ['p2'], visits: 0, lastContact: 'hace 2 h' },
  { id: 'c3', name: 'Ana Bordón',       role: 'prospect', tags: ['Familia','Colegiales'], phone: '+54 11 4920 3315', email: 'a.bordon@mail.com', dni: '31.450.221', since: '02 abr 2026', agent: 'M. Pereyra', notes: 'Pareja con un hijo. Busca PH o casa.', interest: ['p3','p8'], visits: 2, lastContact: 'ayer' },
  { id: 'c4', name: 'Diego Fernández',  role: 'prospect', tags: ['Inversor'], phone: '+54 11 3402 9988', email: 'diego.f@mail.com', dni: '29.882.014', since: '18 abr 2026', agent: 'J. Suárez', notes: 'Pago contado USD. Recoleta.', interest: ['p4'], visits: 1, lastContact: 'hace 4 h' },
  { id: 'c5', name: 'Fernanda Sánchez', role: 'tenant',  tags: ['Inquilino','Almagro'], phone: '+54 11 5012 8866', email: 'f.sanchez@mail.com', dni: '33.620.114', since: '21 ago 2025', agent: 'L. Vélez', notes: 'Pago al día. Renovación en julio.', interest: ['p5'], visits: 0, lastContact: 'hace 3 d' },
  { id: 'c6', name: 'Julián Donofrio',  role: 'prospect', tags: ['Búsqueda activa'], phone: '+54 11 6644 2210', email: 'j.donofrio@mail.com', dni: '35.118.704', since: '08 abr 2026', agent: 'M. Pereyra', notes: 'Posadas — busca alquiler 2 amb.', interest: ['p10','p1'], visits: 3, lastContact: 'hace 1 d' },
  { id: 'c7', name: 'Martina Vega',     role: 'owner',    tags: ['Propietario'], phone: '+54 11 5288 9001', email: 'm.vega@mail.com', dni: '24.310.998', since: '11 ene 2022', agent: 'J. Suárez', notes: 'Dueña de Juncal 2890.', interest: ['p4'], visits: 0, lastContact: 'hace 1 sem' },
  { id: 'c8', name: 'Pablo Echeverría', role: 'owner',    tags: ['Propietario'], phone: '+54 11 6019 2204', email: 'p.echeverria@mail.com', dni: '22.108.444', since: '02 jun 2020', agent: 'M. Pereyra', notes: 'Casa en Belgrano para venta.', interest: ['p8'], visits: 0, lastContact: 'hace 2 sem' },
  { id: 'c9', name: 'Camila Rivero',    role: 'prospect', tags: ['Familia'], phone: '+54 11 4407 8852', email: 'c.rivero@mail.com', dni: '36.001.553', since: '20 abr 2026', agent: 'L. Vélez', notes: 'Busca PH con patio.', interest: ['p3'], visits: 1, lastContact: 'hace 5 d' },
  { id: 'c10',name: 'Martín Salgado',   role: 'prospect', tags: ['Comercial'], phone: '+54 11 5511 7723', email: 'm.salgado@mail.com', dni: '27.998.110', since: '15 abr 2026', agent: 'M. Pereyra', notes: 'Busca local en Palermo o Belgrano.', interest: ['p6'], visits: 1, lastContact: 'hace 2 d' },
];

// Calendar events: month is May 2026.
// kind: visit | rent | meet | call | sign
let EVENTS = [
  { id: 'e1',  date: '2026-05-12', start: '10:00', end: '11:00', kind: 'visit', title: 'Visita · Av. Cabildo 2350', clientId: 'c1', propId: 'p1', agent: 'M. Pereyra', status: 'confirmed', notes: 'Cliente trae mascota chica.' },
  { id: 'e2',  date: '2026-05-12', start: '11:30', end: '12:30', kind: 'visit', title: 'Visita · Soler 4120 5°B', clientId: 'c2', propId: 'p2', agent: 'J. Suárez', status: 'pending' },
  { id: 'e3',  date: '2026-05-12', start: '15:00', end: '16:00', kind: 'visit', title: 'Visita · Olleros 1850 PH', clientId: 'c3', propId: 'p3', agent: 'M. Pereyra', status: 'confirmed' },
  { id: 'e4',  date: '2026-05-12', start: '17:30', end: '18:30', kind: 'visit', title: 'Visita · Juncal 2890 9°A', clientId: 'c4', propId: 'p4', agent: 'J. Suárez', status: 'pending' },
  { id: 'e5',  date: '2026-05-14', start: '15:00', end: '16:30', kind: 'sign',  title: 'Firma de contrato · Caamaño', clientId: 'c2', propId: 'p2', agent: 'J. Suárez', status: 'confirmed', notes: 'Llevar contrato firmado en 3 copias.' },
  { id: 'e6',  date: '2026-05-15', start: '09:30', end: '10:15', kind: 'visit', title: 'Visita · Bulnes 1560', clientId: 'c6', propId: 'p10', agent: 'M. Pereyra', status: 'confirmed' },
  { id: 'e7',  date: '2026-05-05', start: '09:00', end: '10:00', kind: 'rent',  title: 'Cobro alquileres · 4 contratos', clientId: null, propId: null, agent: 'L. Vélez', status: 'confirmed' },
  { id: 'e8',  date: '2026-05-07', start: '14:00', end: '15:00', kind: 'meet',  title: 'Reunión equipo semanal', clientId: null, propId: null, agent: 'Equipo', status: 'confirmed' },
  { id: 'e9',  date: '2026-05-10', start: '11:00', end: '12:00', kind: 'visit', title: 'Visita · Olleros 1850 PH', clientId: 'c9', propId: 'p3', agent: 'M. Pereyra', status: 'confirmed' },
  { id: 'e10', date: '2026-05-10', start: '17:30', end: '18:00', kind: 'call',  title: 'Llamada · R. Caamaño', clientId: 'c2', propId: 'p2', agent: 'J. Suárez', status: 'confirmed' },
  { id: 'e11', date: '2026-05-18', start: '10:00', end: '10:30', kind: 'rent',  title: 'Vencimiento C-1042', clientId: 'c2', propId: 'p2', agent: 'M. Pereyra', status: 'confirmed' },
  { id: 'e12', date: '2026-05-20', start: '12:00', end: '12:30', kind: 'call',  title: 'Llamada · A. Bordón', clientId: 'c3', propId: null, agent: 'M. Pereyra', status: 'confirmed' },
  { id: 'e13', date: '2026-05-22', start: '16:00', end: '17:00', kind: 'visit', title: 'Visita · Pueyrredón 1502', clientId: 'c10', propId: 'p7', agent: 'L. Vélez', status: 'confirmed' },
  { id: 'e14', date: '2026-05-26', start: '11:00', end: '12:00', kind: 'meet',  title: 'Tasación · Echeverría 2240', clientId: 'c8', propId: 'p8', agent: 'J. Suárez', status: 'confirmed' },
  { id: 'e15', date: '2026-05-13', start: '08:00', end: '09:00', kind: 'visit', title: 'Visita · Av. Cabildo 2350', clientId: 'c1', propId: 'p1', agent: 'M. Pereyra', status: 'cancelled' },
  { id: 'e16', date: '2026-05-08', start: '09:30', end: '10:15', kind: 'visit', title: 'Visita · Charcas 4488', clientId: 'c1', propId: 'p9', agent: 'M. Pereyra', status: 'confirmed' },
  { id: 'e17', date: '2026-05-19', start: '16:00', end: '17:00', kind: 'visit', title: 'Visita · Gascón 1240', clientId: 'c5', propId: 'p5', agent: 'L. Vélez', status: 'pending' },
  { id: 'e18', date: '2026-05-21', start: '10:00', end: '10:30', kind: 'call',  title: 'Llamada · D. Fernández', clientId: 'c4', propId: 'p4', agent: 'J. Suárez', status: 'confirmed' },
  { id: 'e19', date: '2026-05-12', start: '08:30', end: '09:00', kind: 'call',  title: 'Llamada · M. Salgado', clientId: 'c10', propId: 'p6', agent: 'M. Pereyra', status: 'confirmed' },
];

export const fmtCurrency = (n, cur) => {
  if (cur === 'USD') return `USD ${n.toLocaleString('es-AR')}`;
  return `$ ${n.toLocaleString('es-AR')}`;
};
export const padDate = (y,m,d) => `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
export const parseTime = (t) => { const [h,m] = t.split(':').map(Number); return h + m/60; };
export const fmtTime12 = (t) => {
  const [h,m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'pm' : 'am';
  const hh = h % 12 || 12;
  return m === 0 ? `${hh}${ap}` : `${hh}:${String(m).padStart(2,'0')}${ap}`;
};

export const getEvents = () => EVENTS;
export const findClient = (id) => CLIENTS.find(c => c.id === id);
export const findProperty = (id) => PROPERTIES.find(p => p.id === id);
export const updateEvent = (id, patch) => {
  EVENTS = EVENTS.map(e => e.id === id ? { ...e, ...patch } : e);
};
export const removeEvent = (id) => { EVENTS = EVENTS.filter(e => e.id !== id); };
export const addEvent = (e) => { EVENTS = [...EVENTS, { id: 'e' + Math.random().toString(36).slice(2,7), ...e }]; };
let _PROP_LISTENERS = [];
export const subscribeProperties = (fn) => { _PROP_LISTENERS.push(fn); return () => { _PROP_LISTENERS = _PROP_LISTENERS.filter(x => x !== fn); }; };
export const addProperty = (p) => {
  const newP = { id: 'p' + Math.random().toString(36).slice(2,7), photo: 'var(--gray-100)', ...p };
  PROPERTIES.push(newP);
  _PROP_LISTENERS.forEach(fn => fn());
  return newP;
};
