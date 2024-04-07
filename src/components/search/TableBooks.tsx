import { Table } from "flowbite-react";
import { IoMdEye } from "react-icons/io";
import { VscArrowDown, VscArrowUp, VscEye } from "react-icons/vsc";
import { Link } from "react-router-dom";

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
                className="cursor-pointer text-base"
              >
                <p className="flex items-center gap-2">

                  {header}
                  <span className="text-cyan-500">
                    {
                      params.orderBy === header
                      &&
                      (
                        params.order === "ASC"
                          ? <VscArrowDown/>
                          : <VscArrowUp/>
                      )
                    }
                  </span>
                </p>
              </Table.HeadCell>
            ))
          }
          <Table.HeadCell></Table.HeadCell>          
        </Table.Head>

        <Table.Body className="divide-y">
          {
            data.map((book, i) => (
              <Table.Row key={i} className="">
                <Table.Cell>{book.id}</Table.Cell>
                <Table.Cell>{book.titulo}</Table.Cell>
                <Table.Cell>{book.autor}</Table.Cell>
                <Table.Cell>{book.editorial}</Table.Cell>
                <Table.Cell>{book.fecha}</Table.Cell>
                <Table.Cell>{book.cantidad}</Table.Cell>
                <Table.Cell>
                  <Link 
                    to={`/books/manage/${book.id}`}
                    className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700 text-lg flex items-center justify-center"
                  >
                    <IoMdEye/>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </div>
  )
}