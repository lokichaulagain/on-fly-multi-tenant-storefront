import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function Loading() {
  return (
    <div className="px-4 w-full md:max-w-4xl mx-auto mt-4 min-h-screen">
      <Tabs defaultValue="orders" className="">
        <div className="flex items-center justify-between">
          <TabsList className="flex justify-between">
            <TabsTrigger value="orders" >Order History</TabsTrigger>
            <TabsTrigger value="profile" disabled>Profile Settings</TabsTrigger>
          </TabsList>

          <div className="flex">
            <Button variant={"destructive"} className="w-full opacity-70" disabled>
              Logout
            </Button>
          </div>
        </div>

        <TabsContent value="orders" className="w-full border border-accent rounded-md p-4 shadow-lg"> 
          <div className="space-y-4">
            {/* Order skeleton items */}
            {[1, 2, 3,4].map((item) => (
              <div key={item} className="border border-accent rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-6 bg-accent rounded w-1/3 animate-pulse"></div>
                  <div className="h-6 bg-accent rounded w-1/4 animate-pulse"></div>
                </div>
                <div className="h-px bg-accent w-full my-2"></div>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="w-20 h-20 bg-accent rounded animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-accent rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-accent rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-accent rounded w-1/4 animate-pulse"></div>
                  </div>
                  <div className="flex flex-col space-y-2 w-1/4">
                        <div className="h-4 bg-accent rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-accent rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

       
      </Tabs>
    </div>
  )
}

