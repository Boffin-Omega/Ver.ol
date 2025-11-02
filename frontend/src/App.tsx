import {Sidebar, SidebarHeader, 
    SidebarContent, 
  SidebarMenuButton,
  SidebarMenuItem, SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarProvider} from "@/components/ui/sidebar"

  import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,

} from "@/components/ui/command"

import {Outlet, Link, useLoaderData} from 'react-router'
import Navbar02 from "./components/Navbar02";


//shud check up on this interface
interface repo{
    _id:string,
    name:string,
    owner:string,
    commits: string[],
    createdAt: string; 
    updatedAt: string; 
    __v: number;
}
export default function App(){
    const repos = useLoaderData();
    // const repos = [
    //     {
    //         id:'r1',
    //         name:"Repo 1"
    //     }
    // ]
    console.log(repos)
    return (
        <SidebarProvider>
            <Sidebar className="grow-1">
                    <SidebarHeader>
                        <span>DashBoard</span>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="bg-[#34a832] text-white hover:opacity-70"><Link to="/app/createview">Create Repository</Link></SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel>Search for repository</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <Command>
                                    <CommandInput placeholder="Type a command or search..." />
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>

                                        <CommandGroup heading="Your repositories">
                                            {repos.length ?
                                                repos.map((repo:repo) => (
                                                <CommandItem key={`C-${repo._id}`} id={repo._id}>
                                                    <Link to={`/app/repoview/${repo._id}/${repo.name}`} key={repo._id}>{repo.name}</Link>
                                                </CommandItem>
                                            ))
                                            :<div>No repositories</div>
                                            }

                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </SidebarGroupContent>
                        </SidebarGroup>

                    </SidebarContent>
            </Sidebar>

            <div className="main grow-2 p-5 flex flex-col gap-y-20">
                <div className="self-end">
                    <Navbar02 />
                </div>
                <Outlet>

                </Outlet>
            </div>
        </SidebarProvider>

    );
}