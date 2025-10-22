import {Sidebar, SidebarHeader, 
    SidebarContent,  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarProvider} from "@/components/ui/sidebar"

  import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import {Outlet, Link} from 'react-router'
import Navbar02 from "./components/Navbar02";
import { repos } from "./data/repos.ts"

//this should come from server

export default function App(){
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
                                            {repos.map((repo) => (
                                                <CommandItem key={repo.id}>
                                                    <Link to={`/app/repoview/${repo.id}`}>{repo.name}</Link>
                                                </CommandItem>
                                            ))}

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
                <Outlet></Outlet>
            </div>
        </SidebarProvider>

    );
}