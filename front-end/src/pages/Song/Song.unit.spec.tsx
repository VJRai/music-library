import { render, screen } from '@testing-library/react'
import * as appClient from '../../api/apiClient'
import { secondsToSecondsMinutesHours } from '../../common/utils';
import dayjs from 'dayjs';
import { SWRResponse } from 'swr';
import { SongDTO } from '../../common/types/song.types';
import { Song } from './Song';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockNavigate,
}))

describe('<Song/> - Unit Tests', () => {

    let useGetSongSpy: jest.SpyInstance<SWRResponse<SongDTO, Error, any>>;

    beforeEach(() => {
        useGetSongSpy = jest.spyOn(appClient, 'useGetSong')
    })

    it('should initially load a skeleton UI while attempting to retrieve song data', () => {

        // GIVEN
        useGetSongSpy.mockReturnValue({
            isLoading: true,
            data: undefined,
            error: undefined,
            mutate: async () => undefined,
            isValidating: false
        })

        render(<Song/>)

        // WHEN
        const skeletonUI = screen.queryByTestId('skeleton_ui')

        // THEN
        expect(skeletonUI).toBeInTheDocument()

    })

    it('should attempt to navigate to 404 route when failed to fetch song data', async () => {
        // GIVEN
        useGetSongSpy.mockReturnValue({
            isLoading: false,
            data: undefined,
            error: new Error("oh no!"),
            mutate: async () => undefined,
            isValidating: false
        })


        // WHEN
        render(<Song />)

        // THEN
        expect(mockNavigate).toBeCalledWith('/404')

    })

    it('should display the song UI when song data has been fetched', () => {

        // GIVEN
        const expectedSong = {
            id: "1",
            title: "test song",
            artists: [
                {
                    id: 1,
                    name: "mike",
                    credit: "featured"
                }
            ],
            albums: [],
            genres: [],
            duration: 100,
            releaseDate: "123456"
        }

        const spy = jest.spyOn(appClient, 'useGetSong');
        spy.mockReturnValue({
            isLoading: false,
            data: expectedSong,
            error: undefined,
            mutate: async () => undefined,
            isValidating: false
        })

        
        // WHEN
        render(<Song />)
        const skeletonUI = screen.queryByTestId('skeleton_ui');
        const songUI = screen.queryByTestId('song_ui')

        const title = screen.getByText(expectedSong.title);
        const duration = screen.getByText(secondsToSecondsMinutesHours(expectedSong.duration));
        const releaseDate = screen.getByText(dayjs(parseInt(expectedSong.releaseDate)).format("YYYY").toString());


        // THEN
        expect(skeletonUI).not.toBeInTheDocument()
        expect(songUI).toBeVisible()
        expect(title).toBeVisible()
        expect(duration).toBeVisible()
        expect(releaseDate).toBeVisible()

    })

})