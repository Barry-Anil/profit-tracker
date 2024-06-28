import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const SearchOrderNumber = () => {
	const searchParams = useSearchParams();
	const orderNumber = searchParams.get("searchOrder");

	return (
		<div className="grid grid-cols-3 items-center gap-4">
            <div className="space-y-1">
                 <p className="font-medium flex items-center gap-1"><Search className="h-4 w-4" /> Search Order Number</p>
			    <Input
				type="text"
				name="searchOrder"
				placeholder="Search orders..."
				value={orderNumber || ""}
				onChange={(e) => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set("searchOrder", e.target.value);
					window.history.replaceState(
						{},
						document.title,
						`?${searchParams.toString()}`,
					);
				}}
			    />
            </div>
            <div className="space-y-1">
            <p className="font-medium">Amount Recd</p>
			<Input
				type="text"
				name="amountRecd"
				placeholder="Amount Recd"
				disabled
			/>
            </div>
            <div className="space-y-1">
            <p className="font-medium">Pending Payment</p>
			<Input
				type="text"
				name="pendingPayment"
				placeholder="Pending Payment"
				disabled
			/>
            </div>
		</div>
	);
};

export default SearchOrderNumber;
