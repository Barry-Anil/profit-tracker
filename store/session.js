import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import zustymiddleware from 'zustymiddleware';
const clientSession = zustymiddleware((set) => ({
    clientSession: false,
    setData: (state) => set(state),
    clearData: () => set({ clientSession: '' }),
}));

const useClientSession = create(
    devtools(
        persist(clientSession, {
            name: 'clientSession',
        })
    )
);

export default useClientSession;
