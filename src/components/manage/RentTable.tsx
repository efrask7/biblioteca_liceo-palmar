import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";

interface IRentTable {
  data: IBookRent[]
}

const tableHeaders = ["nombre", "fecha", "estado", "entregado"]

export default function RentTable({ data }: IRentTable) {

  const [bookRent, setBookRent] = useState<IBookRent[]>([])

  useEffect(() => {
    console.log("effect renttable", data)
    setBookRent(data)
  }, [data])

  function changeStatus(id: number, status: "rented" | "returned") {
    window.rent.editRent({
      id,
      status
    })
  }

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
            bookRent.map((rent, i) => {

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
                    className={`${rent.status === "rented" ? "text-emerald-400" : "text-gray-300"}`}
                  >
                    {statusName[rent.status]}
                  </Table.Cell>
                  <Table.Cell>{endDate}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color={rent.status === "rented" ? "success" : "failure"}
                      title={`Marcar como ${rent.status === "rented" ? "entregado" : "prestado"}`}
                      onClick={() => {
                          const newStatus = rent.status === "rented" ? "returned" : "rented"
                          changeStatus(rent.btId, newStatus)
                        }
                      }
                    >
                      {
                        rent.status === "rented"
                          ? <BiCheck className="size-6"/> 
                          : <BiX className="size-6"/>
                      }
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