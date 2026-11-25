interface PaginationProps {
    page:number; 
    totalPages: number; 
    setPage: (page:number) => void
}

export default function Pagination ({ page, totalPages, setPage } : PaginationProps) {
    return (
        <div className="felx gap-2 items-center mt-4">
            <button disabled={page === 0} onClick={() => setPage(page-1)}>Anterior</button>
            <span>Página {page + 1} de {totalPages} </span>
            <button disabled={ page >= totalPages - 1 } onClick={() => setPage(page + 1)}>Siguiente</button>
        </div>
    )
}