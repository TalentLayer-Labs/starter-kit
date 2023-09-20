import { TalentLayerClient } from "@TalentLayer/client";
import { useEffect, useState } from "react";


const useTlClient = (chainId: number, infuraClientId: string, infuraClientSecret: string) => {
    const [tlClient, setTlClient] = useState<TalentLayerClient>();

    useEffect(() => {
        if (chainId) {
            const _tlClient = new TalentLayerClient({
                chainId,
                infuraClientId,
                infuraClientSecret,
            });
            setTlClient(_tlClient);
        }
    }, [chainId]);

    return tlClient;
}

export default useTlClient;