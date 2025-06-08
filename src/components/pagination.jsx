const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

export function Pagination() {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border-t border-zinc-600 px-4 py-5 sm:px-6"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-zinc-100">
          Mostrando <span className="font-medium">1</span> até <span className="font-medium">10</span> de{' '}
          <span className="font-medium">20</span> resultados
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Anterior
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Próximo
        </a>
      </div>
    </nav>
  )
}
