import { Table } from "flowbite-react";
import { IoMdEye } from "react-icons/io";
import { VscArrowDown, VscArrowUp, VscEye } from "react-icons/vsc";
import { Link } from "react-router-dom";

interface ITableBooks {
  data: IBookRentWithData[]
}

export default function TableBooksRented({ data = [] }: ITableBooks) {
  return (
    <div className="overflow-x-auto border border-bordercol rounded">
      <Table 
        striped 
        hoverable
      >
        <Table.Head>
          <Table.HeadCell className="cursor-pointer text-base bg-headgreen">
            <p className="flex items-center gap-2">Libro:</p>
          </Table.HeadCell>
          <Table.HeadCell className="cursor-pointer text-base bg-headgreen">
            <p className="flex items-center gap-2">Persona:</p>
          </Table.HeadCell>
          <Table.HeadCell className="cursor-pointer text-base bg-headgreen">
            <p className="flex items-center gap-2">Fecha:</p>
          </Table.HeadCell>
          <Table.HeadCell className="bg-headgreen"/>
        </Table.Head>

        <Table.Body className="divide-y text-black">
          {
            data.map((book, i) => {
            
              const startObj = new Date(book.startDate)
              const startDate = `${startObj.getDate()}/${startObj.getMonth()+1}/${startObj.getFullYear()} Hora (${startObj.getHours()}:${startObj.getMinutes()}:${startObj.getSeconds()})`

              return (
                <Table.Row key={i} className="">
                  <Table.Cell className="font-bold">{book.title}</Table.Cell>
                  <Table.Cell>{book.name}</Table.Cell>
                  <Table.Cell>{startDate}</Table.Cell>
                  <Table.Cell>
                    <Link 
                      to={`/books/manage/${book.book}`}
                      className="p-2 rounded-lg bg-azure-radiance-500 hover:bg-azure-radiance-600 focus:bg-azure-radiance-700 text-white text-lg border border-headgreen flex items-center justify-center"
                    >
                      <IoMdEye/>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )}
            )
          }
        </Table.Body>
      </Table>
    </div>
  )
}