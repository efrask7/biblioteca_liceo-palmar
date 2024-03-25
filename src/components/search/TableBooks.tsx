import { Table } from "flowbite-react";
import { VscArrowDown, VscArrowUp, VscEye } from "react-icons/vsc";

interface ITableBooks {
  data: IBookDB[]
  setOrderBy: (attribute: TBookParamDB) => void
  params: IGetBooks["params"]
}

const tableHeaders = ["id", "titulo", "autor", "editorial", "fecha", "cantidad"]

export default function TableBooks({ data, setOrderBy, params }: ITableBooks) {
  return (
    <div className="overflow-x-auto">
      <Table striped hoverable>
        <Table.Head>
          {
            tableHeaders.map((header, i) => (
              <Table.HeadCell 
                key={i} 
                onClick={() => setOrderBy(header as TBookParamDB)} 
                className="cursor-pointer"
              >
                <p className="flex items-center gap-2">

                  {header}
                  {
                    params.orderBy === header
                    &&
                    (
                      params.order === "ASC"
                        ? <VscArrowDown/>
                        : <VscArrowUp/>
                    )
                  }
                </p>
              </Table.HeadCell>
            ))
          }
          <Table.HeadCell></Table.HeadCell>          
        </Table.Head>

        <Table.Body className="divide-y">
          {
            data.map((book, i) => (
              <Table.Row key={i} className="text-gray-200">
                <Table.Cell>{book.id}</Table.Cell>
                <Table.Cell>{book.titulo}</Table.Cell>
                <Table.Cell>{book.autor}</Table.Cell>
                <Table.Cell>{book.editorial}</Table.Cell>
                <Table.Cell>{book.fecha}</Table.Cell>
                <Table.Cell>{book.cantidad}</Table.Cell>
                <Table.Cell><VscEye/></Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </div>
  )
}