import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
    const params = useParams();

    const convarsationId = useMemo(() => {
        if (!params?.convarsationId) {
            return '';
        }

        return params.convarsationId as string;
    }, [params?.convarsationId]);

    const isOpen = useMemo(() => !!convarsationId, [convarsationId]);

    return useMemo(
        () => ({
            isOpen,
            convarsationId,
        }),
        [isOpen, convarsationId]
    );
};

export default useConversation;
