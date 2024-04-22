export type MainOrderTableType = {
    order_number: string;
    order_date: string;
    customer_name: string;
    salestrip_name: string;
};

export type OrdersInGroupTableType = {
    order_number: string;
    customer_name: string;
    order_date: string;
    account_status: string;
    account_status_date: string;
    fabric_status: string;
    fabric_status_date: string;
    order_status: string;
    order_status_date: string;
    prod_reg: string;
    prod_reg_date: string;
    qa_status: string;
    qa_status_date: string;
    packing_status: string;
    packing_status_date: string;
};

export type SalesTrip = {
    salestrip_name: string;
};

export type Year = {
    year: number;
};
