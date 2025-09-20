import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar - Collapsible on mobile */}
      <div className="hidden md:flex md:w-64 flex-col p-4 space-y-4 border-r border-gray-800">
        <h2 className="text-lg font-semibold">Multiverse</h2>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <Button variant="outline" className="w-full">
          New Query
        </Button>
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Search"
            className="w-full"
            // icon={<Search className="h-4 w-4" />}
          />
          <div className="space-y-1">
            <div className="text-sm font-medium">Recent</div>
            <div className="text-xs text-muted-foreground">
              What is UI design?
            </div>
            <div className="text-xs text-muted-foreground">
              Can you write...
            </div>
            <div className="text-xs text-muted-foreground">
              Can you discuss...
            </div>
            <a href="#" className="text-xs text-muted-foreground">
              See More
            </a>
          </div>
        </div>
        <div className="mt-auto space-y-2">
          <Button variant="outline" className="w-full">
            Upgrade Plan
          </Button>
          <div className="text-sm text-muted-foreground">
            felicia.reid@example.com
          </div>
          <Button variant="ghost" className="w-full">
            Log out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">
            Every perspective, every AI, one place.
          </h1>
          <div className="flex w-full max-w-md items-center space-x-2">
            <Input
              type="text"
              placeholder="Ask a question about anything..."
              className="flex-1"
            />
            <Button variant="default">Generate</Button>
          </div>
          <div className="text-sm text-muted-foreground">Specification</div>
        </div>
      </div>

      {/* Mobile Sidebar Trigger */}
      <Sidebar />
    </div>
  );
}