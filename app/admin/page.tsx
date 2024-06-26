import ProtectedRouteWrapper from '../components/ProtectedRouteWrapper'
import HackathonConfig from '../components/Admin/HackathonConfig'
import CreateHackathon from '../components/Admin/CreateHackathon'
import { Separator } from '@/components/ui/separator'
import List from '../components/Admin/List'

function Admin() {
    return (
        <ProtectedRouteWrapper admin>
            <main className="px-5 pb-20 pt-10 sm:px-14">
                <h1 className="mb-10 text-4xl font-extrabold">
                    Admin Functions
                </h1>
                <div className="flex flex-wrap items-start gap-10">
                    <HackathonConfig />
                    <CreateHackathon />
                </div>
                <Separator className="my-10" />
                <List />
            </main>
        </ProtectedRouteWrapper>
    )
}

export default Admin
