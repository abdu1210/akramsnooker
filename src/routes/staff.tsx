import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SiteLogo } from "@/components/site/SiteLogo";
import { clearStaffAuthenticated, isStaffAuthenticated } from "@/lib/staff-auth";
import {
  CLUB_TABLES,
  closeTableRow,
  createEmptyRow,
  type TableRowBilling,
} from "@/lib/table-billing";
import { toast } from "sonner";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [{ title: "Table Billing — Akram Snooker Staff" }],
  }),
  component: StaffPage,
});

function StaffPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState<TableRowBilling[]>(() =>
    CLUB_TABLES.map(() => createEmptyRow()),
  );

  useEffect(() => {
    if (!isStaffAuthenticated()) {
      navigate({ to: "/login" });
    } else {
      setReady(true);
    }
  }, [navigate]);

  function updateRow(index: number, patch: Partial<TableRowBilling>) {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch, total: null } : row)),
    );
  }

  function handleClose(index: number) {
    const table = CLUB_TABLES[index];
    const row = rows[index];
    const result = closeTableRow(row, table.ratePerHour);
    if ("error" in result) {
      toast.error(`${table.label}: ${result.error}`);
      return;
    }
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, total: result.total } : r)),
    );
  }

  function handleLogout() {
    clearStaffAuthenticated();
    navigate({ to: "/login" });
  }

  if (!ready) return null;

  return (
    <div className="px-4 sm:px-6 py-10 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <SiteLogo size="md" />
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">Table billing</h1>
            <p className="text-sm text-muted-foreground">
              Snooker 40 AED/hr · Pool 30 AED/hr
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Log out
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px]">Table</TableHead>
              <TableHead>Start time</TableHead>
              <TableHead>End time</TableHead>
              <TableHead className="min-w-[100px]">Extra (AED)</TableHead>
              <TableHead className="w-[100px] text-center">Close</TableHead>
              <TableHead className="min-w-[120px] text-right">Total (AED)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CLUB_TABLES.map((table, index) => {
              const row = rows[index];
              return (
                <TableRow key={table.id}>
                  <TableCell className="font-medium whitespace-nowrap">{table.label}</TableCell>
                  <TableCell>
                    <Input
                      type="time"
                      value={row.startTime}
                      onChange={(e) => updateRow(index, { startTime: e.target.value })}
                      className="w-[130px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="time"
                      value={row.endTime}
                      onChange={(e) => updateRow(index, { endTime: e.target.value })}
                      className="w-[130px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      placeholder="0"
                      value={row.extraAmount}
                      onChange={(e) => updateRow(index, { extraAmount: e.target.value })}
                      className="w-[100px]"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" onClick={() => handleClose(index)}>
                      Close
                    </Button>
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">
                    {row.total !== null ? row.total.toFixed(2) : "—"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Set start and end time, add any extra amount, then click Close. Total = play time charge +
        extra amount.
      </p>
    </div>
  );
}
