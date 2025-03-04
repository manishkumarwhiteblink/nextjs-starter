import { AppSidebar } from '@/components/app-sidebar';
import { AreaChartDemo } from '@/components/area-chart';
import AuthGuard from '@/components/auth/AuthGuard';
import { BarChartDemo } from '@/components/bar-chart';
import { ChartDemo } from '@/components/chart';
import { DataTable } from '@/components/datatable/data-table';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { columns } from '../../components/datatable/columns';
import path from 'node:path';
import fs from 'fs';

async function getData() {
  const filePath = path.join(
    process.cwd(),
    '/src/components/datatable',
    'data.json'
  );
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

export default async function Page() {
  const data = await getData();
  console.log('data', data);
  // const [data, setData] = useState<Expense[]>([]);

  return (
    <AuthGuard>
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/50">
                    <AreaChartDemo />
                  </div>
                  <div className="aspect-video rounded-xl bg-muted/50">
                    <BarChartDemo />
                  </div>
                  <div className="aspect-video rounded-xl bg-muted/50 ">
                    <ChartDemo />
                  </div>
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl  md:min-h-min">
                  {/* <DataTableDemo /> */}
                  <DataTable data={data} columns={columns} />
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </AuthGuard>
  );
}
