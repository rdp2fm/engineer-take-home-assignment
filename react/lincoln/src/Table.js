import React from 'react';

import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";

class Table extends React.Component {
    state = {
        page: 0,
        count: 10,
        data: [],
        totalDonation: 0
    };

    componentDidMount() {
        this.getData(this.state.page, this.state.count);
    }

    getData = (page, rowsPerPage) => {
        fetch(`https://36hidzapk7.execute-api.us-east-1.amazonaws.com/Prod/`)
            .then(response => {
                console.log(response);
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then(data => {
                console.log('data: ', data);
                const donationTotal = data.reduce((prev, cur) => prev + cur.donation_amount, 0);
                this.state.totalDonation = donationTotal.toFixed(2);

                console.log('data: ', data);
                this.setState({
                    page,
                    data,
                });
            });
    };






    render() {
        const columns = [
            {
                name: "donor_id",
                label: "Donor ID",
                options : {
                    filter: false,
                    sort: false
                }

            },
            {
                name: "donor_name",
                label: "Donor Name",
                options: {
                    filter: true,
                    filterOptions: {
                        names: ["Known Donors"],
                        logic(name, filters) {

                            return name == "Anonymous";
                        }
                    },
                    print: false,
                    sort: true,
                }
            },
            {
                name: "donor_email",
                label: "Donor Email",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "donor_gender",
                label: "Donor Gender",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "donor_address",
                label: "Donor Address",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "donation_amount",
                label: "Donation Amount",
                options: {
                    filter: true,
                    filterOptions: {
                        names: ["< $100", "< $500", "> $500"],
                        logic(amount, filters) {
                            const show = (filters.indexOf("< $100") >= 0 && amount <= 100) ||
                                (filters.indexOf("< $500") >= 0 && amount > 100 && amount <= 500) ||
                                (filters.indexOf("> $500") >= 0 && amount > 500);
                            const filtered = !show
                            return filtered;
                        }
                    },
                    print: false,
                    sort: true,
                }
            },
        ];
        const { data } = this.state;

        const options = {
            filter: true,
            filterType: 'dropdown',
            responsive: 'scroll',
            search: false,
            selectableRows : false,
            customToolbar: () => {
                return (
                    <CustomToolbar/>
                );
            }

        };

        return (
            <MUIDataTable
                title={`Total Donations: $${this.state.totalDonation || ""}`}
                data={data}
                columns={columns}
                options={options}
            />
        );
    }
}

export default Table;