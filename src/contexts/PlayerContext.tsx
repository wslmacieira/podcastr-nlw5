import { createContext, useState, ReactNode } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currenEpisodeIndex: number;
  isPlaying: boolean;
  play: (episodes: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

type PlayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currenEpisodeIndex, setCurrenEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrenEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrenEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    const nextEpisodeIndex = currenEpisodeIndex + 1;

    if (nextEpisodeIndex < episodeList.length) {
      setCurrenEpisodeIndex(currenEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (currenEpisodeIndex > 0) {
      setCurrenEpisodeIndex(currenEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currenEpisodeIndex,
        play,
        playList,
        playNext,
        playPrevious,
        isPlaying,
        togglePlay,
        setPlayingState
      }}>
      {children}
    </PlayerContext.Provider>
  )
}
