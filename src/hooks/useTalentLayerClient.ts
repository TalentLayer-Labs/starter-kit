import { TalentLayerClient } from "@TalentLayer/client";
import { useEffect, useState } from "react";


const useTalentLayerClient = (chainId: number, infuraClientId: string, infuraClientSecret: string) => {
    const [tlClient, setTlClient] = useState<TalentLayerClient>();

    useEffect(() => {
        if (chainId) {
            const _tlClient = new TalentLayerClient({
                chainId,
                infuraClientId,
                infuraClientSecret,
                platformId: 25
            });
            setTlClient(_tlClient);
        }
    }, [chainId]);

    return tlClient;
}

export default useTalentLayerClient;