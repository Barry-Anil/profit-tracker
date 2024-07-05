import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const SearchOrderNumber = ({userDataDetails } : {userDataDetails : any}) => {
	const searchParams = useSearchParams();
	const orderNumber = searchParams.get("searchOrder");

	const handleClick = async() => {
		await userDataDetails()
	}

	return (
		<div className="flex flex-wrap items-center justify-between gap-4">
			<div className="space-y-1">
				<p className="font-medium flex items-center gap-1">
					Search Order Number
				</p>
				<div className="flex items-center gap-2">
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
					<Button onClick={handleClick}>
						<Search className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<div className="flex flex-wrap items-center gap-4">
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
		</div>
	);
};

export default SearchOrderNumber;
