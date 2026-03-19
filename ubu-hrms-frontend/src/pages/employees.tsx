export default function Employees() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Employees</h1>
        <p className="text-muted-foreground mt-1">Manage all employees in the system.</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <p className="text-muted-foreground">Employees list will be displayed here.</p>
      </div>
    </div>
  )
}
