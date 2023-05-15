import { useEffect, useState } from "react";

interface IUseLoadDataProps<T> {
	loadData: () => Promise<T>;
	trackedField?: string;
	withEmptyData?: boolean;
	withHandleError?: boolean;
}

export const useLoadData = <T>({
	loadData,
	trackedField,
	withHandleError,
	withEmptyData,
}: IUseLoadDataProps<T>) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isEmptyData, setIsEmptyData] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [isError, setIsError] = useState(false);
	const handleLoadData = async () => {
		try {
			await loadData();
			if (isEmptyData && withEmptyData) {
				setIsEmptyData(false);
			}
		} catch (err) {
			if (withEmptyData) {
				setIsEmptyData(true);
			}
			if (withHandleError) {
				setIsError(true);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleReset = async () => {
		if (isError) {
			setIsError(false);
		}
		setIsLoading(true);
		await handleLoadData();
		setIsLoading(false);
	};

	const handleRefreshData = async () => {
		setRefreshing(true);
		await handleLoadData();
		setRefreshing(false);
	};

	useEffect(() => {
		handleLoadData();
	}, [trackedField]);

	return {
		isLoading,
		refreshing,
		handleReset,
		handleRefreshData,
		isEmptyData,
		isError,
	};
};
