import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, Badge, Avatar, EmptyState } from '../components/ui'
import { USERS } from '../data/dummyData'

const AVATAR_COLORS = ['brand', 'purple', 'blue', 'amber', 'green', 'rose']
const FILTER_OPTS = ['All', 'Active', 'Inactive', 'Pending', 'Admin', 'Editor', 'Manager', 'User']
const PER_PAGE = 7

const UsersPage = () => {
  const { dark } = useApp()
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('All')
  const [sort, setSort]         = useState('name')
  const [page, setPage]         = useState(1)
  const [selected, setSelected] = useState([])

  const filtered = USERS
    .filter(u => {
      const q = search.toLowerCase()
      const match = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      const fMatch = filter === 'All' || u.status === filter || u.role === filter
      return match && fMatch
    })
    .sort((a, b) => (a[sort] || '').localeCompare(b[sort] || ''))

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  const toggleOne = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const toggleAll = () => setSelected(selected.length === paginated.length ? [] : paginated.map(u => u.id))

  const goPage = (p) => { setPage(p); setSelected([]) }

  const thCls = `px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase whitespace-nowrap
    ${dark ? 'text-gray-600' : 'text-gray-400'}`

  const tdCls = `px-4 py-3.5`

  return (
    <div className="p-4 lg:p-6 space-y-5 page-enter">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className={`font-display font-bold text-lg ${dark ? 'text-white' : 'text-gray-900'}`}>All Users</h2>
          <p className="text-xs text-gray-500 mt-0.5">{filtered.length} users total</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-brand">
          <i className="fa-solid fa-user-plus text-xs" />
          <span>Add User</span>
        </button>
      </div>

      {/* ── Toolbar ── */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 flex-1 min-w-44
            ${dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
          `}>
            <i className="fa-solid fa-search text-gray-500 text-xs flex-shrink-0" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); goPage(1) }}
              placeholder="Search by name or email..."
              className={`bg-transparent text-sm outline-none flex-1 min-w-0
                ${dark ? 'text-gray-300 placeholder-gray-600' : 'text-gray-700 placeholder-gray-400'}
              `}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-500 hover:text-gray-300">
                <i className="fa-solid fa-xmark text-xs" />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex gap-1.5 flex-wrap items-center">
            {FILTER_OPTS.map(f => (
              <button
                key={f}
                onClick={() => { setFilter(f); goPage(1) }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                  ${filter === f
                    ? 'bg-brand-500 text-white shadow-brand'
                    : dark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className={`text-xs rounded-xl px-3 py-2 border outline-none cursor-pointer
              ${dark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}
            `}
          >
            <option value="name">Sort: Name</option>
            <option value="role">Sort: Role</option>
            <option value="status">Sort: Status</option>
            <option value="joined">Sort: Joined</option>
          </select>
        </div>
      </Card>

      {/* ── Bulk Action Bar ── */}
      {selected.length > 0 && (
        <div className={`flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl border
          ${dark ? 'bg-brand-500/8 border-brand-500/25' : 'bg-brand-50 border-brand-200'}
        `}>
          <span className="text-sm font-semibold text-brand-400">{selected.length} selected</span>
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <button className="text-xs font-semibold text-blue-400 hover:underline">Export</button>
            <button className="text-xs font-semibold text-amber-400 hover:underline">Deactivate</button>
            <button className="text-xs font-semibold text-red-400 hover:underline">Delete</button>
            <button onClick={() => setSelected([])} className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'} hover:underline`}>
              Clear selection
            </button>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <Card className="overflow-hidden animate-fade-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={dark ? 'bg-gray-800/50' : 'bg-gray-50'}>
                <th className={`${thCls} w-10`}>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-brand-500 cursor-pointer"
                    checked={selected.length === paginated.length && paginated.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                <th className={thCls}>User</th>
                <th className={thCls}>Role</th>
                <th className={thCls}>Status</th>
                <th className={`${thCls} hidden md:table-cell`}>Country</th>
                <th className={`${thCls} hidden lg:table-cell`}>Revenue</th>
                <th className={`${thCls} hidden xl:table-cell`}>Joined</th>
                <th className={thCls}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${dark ? 'divide-gray-800/60' : 'divide-gray-100'}`}>
              {paginated.length === 0
                ? (
                  <tr>
                    <td colSpan="8">
                      <EmptyState icon="fa-users-slash" title="No users found" desc="Try adjusting your search or filters" />
                    </td>
                  </tr>
                )
                : paginated.map((u, i) => (
                  <tr
                    key={u.id}
                    className={`tr-hover
                      ${selected.includes(u.id)
                        ? (dark ? 'bg-brand-500/6' : 'bg-brand-50/60')
                        : (dark ? 'hover:bg-gray-800/30' : 'hover:bg-gray-50')
                      }
                    `}
                  >
                    {/* Checkbox */}
                    <td className={tdCls}>
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded accent-brand-500 cursor-pointer"
                        checked={selected.includes(u.id)}
                        onChange={() => toggleOne(u.id)}
                      />
                    </td>

                    {/* User */}
                    <td className={tdCls}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          initials={u.avatar}
                          size="md"
                          color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                        />
                        <div className="min-w-0">
                          <div className={`text-sm font-semibold truncate ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{u.name}</div>
                          <div className="text-xs text-gray-500 truncate">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className={tdCls}><Badge status={u.role} /></td>

                    {/* Status */}
                    <td className={tdCls}><Badge status={u.status} /></td>

                    {/* Country */}
                    <td className={`${tdCls} hidden md:table-cell text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {u.country}
                    </td>

                    {/* Revenue */}
                    <td className={`${tdCls} hidden lg:table-cell font-mono text-sm font-bold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {u.revenue}
                    </td>

                    {/* Joined */}
                    <td className={`${tdCls} hidden xl:table-cell text-xs text-gray-500 whitespace-nowrap`}>
                      {u.joined}
                    </td>

                    {/* Actions */}
                    <td className={tdCls}>
                      <div className="flex items-center gap-0.5">
                        {[
                          { icon: 'fa-eye',   color: 'hover:text-brand-400 hover:bg-brand-500/10',  title: 'View'   },
                          { icon: 'fa-pen',   color: 'hover:text-blue-400 hover:bg-blue-500/10',    title: 'Edit'   },
                          { icon: 'fa-trash', color: 'hover:text-red-400 hover:bg-red-500/10',      title: 'Delete' },
                        ].map(a => (
                          <button
                            key={a.icon}
                            title={a.title}
                            onClick={() => alert(`${a.title}: ${u.name}`)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 ${a.color} transition-all`}
                          >
                            <i className={`fa-solid ${a.icon} text-xs`} />
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className={`flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
          <span className="text-xs text-gray-500">
            {filtered.length === 0 ? 'No results' : `Showing ${(safePage - 1) * PER_PAGE + 1}–${Math.min(safePage * PER_PAGE, filtered.length)} of ${filtered.length}`}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goPage(safePage - 1)}
              disabled={safePage === 1}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all
                ${safePage === 1 ? 'opacity-30 cursor-not-allowed' : dark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <i className="fa-solid fa-chevron-left" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => goPage(p)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all
                  ${p === safePage
                    ? 'bg-brand-500 text-white shadow-brand'
                    : dark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >{p}</button>
            ))}

            <button
              onClick={() => goPage(safePage + 1)}
              disabled={safePage === totalPages}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all
                ${safePage === totalPages ? 'opacity-30 cursor-not-allowed' : dark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UsersPage
