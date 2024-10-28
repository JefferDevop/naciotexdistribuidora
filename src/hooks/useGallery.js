import { useState } from "react";

import { getGalleryProductByCode } from "../api/gallery";

export function useGallery() {
    const [gallery, setGallery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getGalleryByCode = async (code) => {
       
        try {
            setLoading(true);
            const response = await getGalleryProductByCode(code);
            setLoading(false);
            setGallery(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return {
        error,
        loading,
        gallery,
        getGalleryByCode,
    };
}
