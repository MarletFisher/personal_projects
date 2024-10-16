import CountryDetails from "@/components/CountryDetails";
import PageHeader from "@/components/PageHeader";
import Error from "next/error";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CountryByID() {
	console.log("Entered CountryByID");

	const router = useRouter();
	const { id } = router.query;
	const { data, error, isLoading } = useSWR(
		`https://xcheng6-web422-8ecavtnqx-xunxiang-chengs-projects.vercel.app/api/countries/${id}`
	);

	if (isLoading) return null;

	if (error || data == null || data == []) {
		return <Error statusCode={404} />;
	}

	return (
		<>
			<PageHeader text={data.name} />

			<CountryDetails country={data} />
		</>
	);
}
