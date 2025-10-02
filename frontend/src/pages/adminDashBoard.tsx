import StatusDashboard from "@/components/Admin/StatusDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AdminDashBoard() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Seller Applications Dashboard
      </h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-[70%] m-auto gap-10 bg-stone-300">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Blocked</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <StatusDashboard />
        </TabsContent>
        <TabsContent value="pending">
          <StatusDashboard status="pending" />
        </TabsContent>
        <TabsContent value="approved">
          <StatusDashboard status="approved" />
        </TabsContent>
        <TabsContent value="rejected">
          <StatusDashboard status="rejected" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminDashBoard;
