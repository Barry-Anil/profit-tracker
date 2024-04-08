import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import zustymiddleware from 'zustymiddleware';
const csvJson = zustymiddleware((set) => ({
    data: [],
    fileName: '',
    dateCode: '',
    setData: (state) => set(state),
    clearData: () => set({ data: [], fileName: '', dateCode: '' }),
}));

const useCsvJson = create(
    devtools(
        persist(csvJson, {
            name: 'csvJson',
        })
    )
);

export default useCsvJson;
