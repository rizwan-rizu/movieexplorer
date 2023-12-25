interface iColumn {
  title: string,
  field: string
}

interface iTableProps {
  column: iColumn[],
  row: any
}
const Table = (props: iTableProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-200">
        <thead className="text-xs text-black dark:text-gray-200 uppercase bg-gray-200 dark:bg-gray-600">
          <tr>
            {props?.column?.map(x => <th key={x.title} scope="col" className="px-6 py-3">{x.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {props?.row?.map((x: any) =>
            <tr key={x.id} className="odd:bg-white even:bg-gray-200 dark:odd:bg-gray-500 dark:even:bg-gray-600 border-b">
              {props?.column?.map((y, idx) => (
                <td key={`${x.id}-${idx}`} className="px-6 py-4">{x[y.field]}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table