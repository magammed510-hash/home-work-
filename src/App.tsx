
import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Plus, Pencil, Trash2, Users } from "lucide-react"

type UserType = {
  id: number
  foto: string
  name: string
}

let User: UserType[] = [
  {
    id: 1,
    foto: "https://media.gettyimages.com/id/2208522191/photo/riyadh-saudi-arabia-cristiano-ronaldo-of-al-nassr-looks-on-during-the-warm-up-prior-to-the.jpg?s=612x612&w=gi&k=20&c=tTGTkgTOKWQlBBNM1t6qEwDG7Mov5njKmBbaDPJCVNA=",
    name: "Cristiano Ronaldo",
  },
  {
    id: 2,
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4yxjXD0kY-j8vT_ZmYf01lyPURIHGRQkVRSpxkIZBWg&s=10",
    name: "Mike Tyson",
  },
  {
    id: 3,
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMwEZ-lFx4s1exjyGGLlFqwY0V7fWprcZm3H-5k8GFTA&s",
    name: "Jackie Chan",
  },
]

function App() {
  const [user, setUser] = useState(User)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [foto, setFoto] = useState("")
  const [editId, setEditId] = useState<number | null>(null)

  const addUser = () => {
    setEditId(null)
    setName("")
    setFoto("")
    setOpen(true)
  }

  const editUser = (elem: UserType) => {
    setEditId(elem.id)
    setName(elem.name)
    setFoto(elem.foto)
    setOpen(true)
  }

  const saveUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editId === null) {
      setUser([
        ...user,
        {
          id: Date.now(),
          name: name,
          foto: foto,
        },
      ])
    } else {
      setUser(
        user.map((elem) =>
          elem.id === editId
            ? { ...elem, name: name, foto: foto }
            : elem
        )
      )
    }

    setOpen(false)
    setName("")
    setFoto("")
    setEditId(null)
  }

  const delUser = (id: number) => {
    setUser(user.filter((elem) => elem.id !== id))
  }

  return (
    <div className="min-h-screen bg-muted/40 p-6 md:p-12">
      <div className="mx-auto max-w-5xl space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Users
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your users and their information.
            </p>
          </div>

          <Button onClick={addUser}>
            <Plus />
            Add user
          </Button>
        </div>

        <div className="rounded-xl border bg-background shadow-sm">
          <div className="flex items-center justify-between border-b p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Users className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">All users</h2>
                <p className="text-sm text-muted-foreground">
                  {user.length} users found
                </p>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">№</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {user.map((elem, index) => (
                <TableRow key={elem.id}>
                  <TableCell className="font-medium">
                    {index + 1}
                  </TableCell>

                  <TableCell>
                    <img
                      src={elem.foto}
                      alt={elem.name}
                      className="size-12 rounded-full border object-cover"
                    />
                  </TableCell>

                  <TableCell className="font-medium">
                    {elem.name}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end">
                      <ButtonGroup>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => editUser(elem)}
                        >
                          <Pencil />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:bg-destructive hover:text-white"
                          onClick={() => delUser(elem.id)}
                        >
                          <Trash2 />
                        </Button>
                      </ButtonGroup>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {user.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No users found.
            </div>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={saveUser}>
            <DialogHeader>
              <DialogTitle>
                {editId === null ? "Add user" : "Edit user"}
              </DialogTitle>

              <DialogDescription>
                Enter user information below.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="foto">Photo URL</Label>
                <Input
                  id="foto"
                  placeholder="Enter photo URL..."
                  value={foto}
                  onChange={(e) => setFoto(e.target.value)}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">
                {editId === null ? "Create user" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
