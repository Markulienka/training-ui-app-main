import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { DataTable2, DateTime } from 'asab_webui_components';
import { useNavigate } from 'react-router-dom';

export function TableScreen(props) {
	const { t } = useTranslation();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [limit, setLimit] = useState(10);
	const [offset, setOffset] = useState(0);
	const [total, setTotal] = useState(0);
	const navigate = useNavigate();
	
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(`https://devtest.teskalabs.com/data?limit=${limit}&offset=${offset}`);
				if (!response.ok) {
					throw new Error("HTTP error");
				}
				const json = await response.json();
				//console.log(json)

				const rows = json.data;
				if (Array.isArray(rows)) {
					setData(rows);
				} else {
					setData([]);
				}
				setTotal(json.count || 0);

			} catch (error) {
				console.log("There has been error with fetching data");
				setError(error);
			}
			setLoading(false);
		}

		fetchData();
	}, [limit, offset]);

	const cols = [
		{
			title: (
				<>
					<i className="bi bi-person-fill" style={{ marginRight: "5px" }}></i>
					{t("Username")}
				</>
			),
			render: ({ row }) => (
				<span
					title={`ID: ${row.id}`}
					style={{ cursor: "pointer", color: "red", textDecoration: "underline dotted" }}
					onClick={() => navigate(`/detail/${row.id}`)}
				>
					{row.username}
				</span>
			),
		},
		{
			title: (
				<>
					<i className="bi bi-envelope-fill" style={{ marginRight: "5px" }}></i>
					{t("Email")}
				</>
			),
			render: ({ row }) => row.email,
		},
		{
			title: (
				<>
					<i className="bi bi-calendar-event" style={{ marginRight: "5px" }}></i>
					{t("Created At")}
				</>
			),
			render: ({ row }) => <DateTime value={row.created} />,
		},
	];

	function updatePageOffset(newPage) {
		setOffset((newPage - 1) * limit);
	}

	function updatePageSize(newLimit) {
		setLimit(newLimit);
		setOffset(0);
	}

	if (loading) {
		return <Container>{t('Loading...')}</Container>;
	}

	if (error) {
		return <Container>{t('Error loading data')}</Container>;
	}

	return (
	<Container className='h-100'>
	<DataTable2
		columns={cols}
		rows={Array.isArray(data) ? data : []}
		limit={limit}
		loading={loading}
		rowHeight="50px"
		total={total}
		updatePageOffset={updatePageOffset}  
		updatePageSize={updatePageSize}       
		/>
	</Container>
	);
}
