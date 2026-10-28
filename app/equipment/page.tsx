import type { Metadata } from "next";
import EquipmentListing from "@/components/EquipmentListing";

export const metadata: Metadata = {
  title: "Equipment Rentals | National Dispatching",
  description: "Rent aerial lifts, forklifts, earthmoving, compaction, power, pumps, sanitation, site services and trucks from National Dispatching.",
};

export default function EquipmentPage() {
  return <EquipmentListing />;
}
