import { Song } from '../common/types/row.type';
import useSWR, { SWRResponse } from 'swr';
import { SongsDTO } from '../common/types/song.types';
import { useState } from 'react';
import { RequestError } from '../common/errors';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

let latestGetSongsKey = '';

export const api = {
    songs: `${API_BASE_URL}/api/v1/songs`,
    song: (id: string) => `${API_BASE_URL}/api/v1/songs/${id}`,
}

const fetcher = async (url: string) => {

    const response = await fetch(url);
    const data = await response.json();

    if(!response.ok){
        throw new RequestError(data.error, data.status)
    }

    return data;

}

export const useGetSongs = (searchParams: string)=>{

    const key = `${api.songs}?${searchParams}`;
    latestGetSongsKey = key;

    return useSWR<SongsDTO, Error>(
        key, fetcher
    );
}

export const useGetSong = (id: string) => {
    return useSWR<Song, Error>(
        api.song(id), fetcher
    );
};

export function useCancelableSWR<T>(key: string, opts: any): [SWRResponse, AbortController] {
    const controller = new AbortController()
    return [useSWR<T, Error>(key, url => fetch(url, { signal: controller.signal }).then(res => res.json()), opts), controller]
}

export const useAddSong = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(false);

    const mutate = async (obj: any) => {

        setIsloading(true);

        try{
            const response = await fetch(api.songs, {
                method:'POST',
                headers:{
                    "Content-Type": 'application/json'
                },
                body:JSON.stringify(obj)
            });

            const result = await response.json();

            setData(result);

        }catch(e: any){
            setError(true)
            setData(e?.message || e)
        }finally{
            setIsloading(false);
        }

    }


    return {
        data,
        isLoading,
        error,
        mutate,
        latestGetSongsKey
    };

}