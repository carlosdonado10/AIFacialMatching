import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <section>
        <h1 className="text-2xl font-bold">Welcome back, Carlos 👋</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your system today.
        </p>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">1,248</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Matches Found</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">312</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">27</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-yellow-600">19</CardContent>
        </Card>
      </section>

      {/* Grid: Requests + Matches */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Current Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Current Requests</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b text-left">
                  <th className="py-2">Requester</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Maria Lopez</td>
                  <td className="py-2">2025-06-08</td>
                  <td className="py-2 text-yellow-600">Pending</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Juan Torres</td>
                  <td className="py-2">2025-06-07</td>
                  <td className="py-2 text-green-600">Matched</td>
                </tr>
                <tr>
                  <td className="py-2">Ana Rojas</td>
                  <td className="py-2">2025-06-05</td>
                  <td className="py-2 text-gray-500">Closed</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Right: Potential Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Potential Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/80?img=1"
                  alt="Lucia Morales"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium">Lucia Morales</span>
                  <span className="text-xs text-muted-foreground">Confidence: 87%</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/80?img=2"
                  alt="Esteban Rivera"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium">Esteban Rivera</span>
                  <span className="text-xs text-muted-foreground">Confidence: 81%</span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
