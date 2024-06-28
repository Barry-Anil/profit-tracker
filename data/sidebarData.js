export const sidebarData = [
	{
		heading: "",
		children: [
			{
				title: "Dashboard",
				value: "dashboard",
				icon: "Home",
				link: "",
				children: [
					{
						title: "Home",
						link: "/",
					},
				],
			},
		],
	},
	{
		heading: "",
		children: [
			{
				title: "Expense Heads",
				value: "expenseheads",
				icon: "PencilRuler",
				link: "",
				children: [
					{
						title: "Define Expense Categories",
						link: "/define-expense-categories",
					},
					{
						title: "Define Production Expense Heads",
						link: "/define-production-expense",
					},
					{
						title: "Define Shipping Cost",
						link: "/define-shipping-cost-per-product",
					},
					{
						title: "Sales Commission Expense Heads",
						link: "/sales-commission-expense-head",
					},
				],
			},
		],
	},
	{
		heading: "",
		children: [
			{
				title: "Transaction Screens",
				value: "transaction",
				icon: "ArrowDownUp",
				link: "",
				children: [
					{
						title: "Sales Travel Expense Heads",
						link: "/sales-travel-expense-head",
					},
					{
						title: "Sales Marketing Expense Heads",
						link: "/sales-marketing-expense-head",
					},
				],
			},
		],
	},
	{
		heading: "Accounts",
		children: [
			{
				title: "Dashboard",
				value: "dashboard",
				icon: "Home",
				link: "/accounts-dashboard",
				children: [],
			},
			{
				title: "Invoice",
				value: "invoice",
				icon: "DollarSign",
				link: "",
				children: [
					{
						title: "List",
						link: "/",
					},
					{
						title: "Preview",
						link: "/",
					},
					{
						title: "Add",
						link: "/",
					},
					{
						title: "Edit",
						link: "/",
					},
				],
			},
			{
				title: "Calendar",
				value: "calendar",
				icon: "Calendar",
				link: "/",
				children: [],
			},
		],
	},
];
