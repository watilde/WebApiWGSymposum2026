import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '⊞' },
  { to: '/sources', label: 'Data Sources', icon: '⛁' },
  { to: '/cohorts', label: 'Cohort Definitions', icon: '⊕' },
  { to: '/vocabulary', label: 'Vocabulary Search', icon: '⌕' },
  { to: '/concept-sets', label: 'Concept Sets', icon: '☰' },
];

export default function Sidebar() {
  return (
    <nav className="w-56 bg-white border-r border-gray-200 flex-shrink-0">
      <ul className="py-2">
        {navItems.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-ohdsi-blue font-medium border-r-2 border-ohdsi-blue'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="text-base">{icon}</span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
