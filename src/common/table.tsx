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
      <table className="w-full text-sm text-left rtl:text-right text-black">
        <thead className="text-xs text-black uppercase bg-gray-200">
          <tr>
            {props?.column?.map(x => <th scope="col" className="px-6 py-3">{x.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {props?.row?.map((x: any) =>
            <tr className="odd:bg-white even:bg-gray-200 border-b">
              {props?.column?.map(y => (
                <td className="px-6 py-4">{x[y.field]}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table