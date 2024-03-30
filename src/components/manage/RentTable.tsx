import { Button, Table } from "flowbite-react";
import { BiCheck } from "react-icons/bi";

interface IRentTable {
  data: IBookRent[]
}

const tableHeaders = ["nombre", "fecha", "estado", "entregado"]

export default function RentTable({ data }: IRentTable) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable striped>
        <Table.Head>
          {
            tableHeaders.map((header, i) => (
              <Table.HeadCell
                key={i}
                className="text-base"
              >
                {header}
              </Table.HeadCell>
            ))
          }
          <Table.HeadCell>
            Acciones
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {
            data.map((rent, i) => {

              const statusName = {
                rented: "Prestado",
                returned: "Devuelto"
              }
              
              const startObj = new Date(rent.startDate)
              const startDate = `${startObj.getDay()}/${startObj.getMonth()}/${startObj.getFullYear()} Hora (${startObj.getHours()}:${startObj.getMinutes()}:${startObj.getSeconds()})`

              let endDate = "-"

              if (rent.endDate) {
                const endObj = new Date(rent.endDate)
                endDate = `${endObj.getDay()}/${endObj.getMonth()}/${endObj.getFullYear()} Hora (${endObj.getHours()}:${endObj.getMinutes()}:${endObj.getSeconds()})`
              }

              return (
                <Table.Row key={i} className="text-gray-200">
                  <Table.Cell>{rent.name}</Table.Cell>
                  <Table.Cell>{startDate}</Table.Cell>
                  <Table.Cell
                    className={`${rent.status === "rented" ? "text-emerald-400" : "text-gray-600"}`}
                  >
                    {statusName[rent.status]}
                  </Table.Cell>
                  <Table.Cell>{endDate}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="success"
                      title="Marcar como entregado"
                    >
                      <BiCheck className="size-6"/> 
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </div>
  )
}