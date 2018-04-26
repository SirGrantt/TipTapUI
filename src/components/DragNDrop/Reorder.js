// @flow
import type { Job, JobMap } from './DNDTypes';
import type { DraggableLocation } from 'react-beautiful-dnd';

//A function for reordering lists of cards
const reorder = (
    list: any[],
    startIndex: number,
    endIndex: number): any[] => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

export default reorder;

type ReorderJobMapArgs = {|
    jobMap: JobMap,
    source: DraggableLocation,
    destination: DraggableLocation,
    |}

export type ReorderJobMapResult = {|
    jobMap: JobMap,
|}

export const reorderJobMap = ({
    jobMap,
    source,
    destination
    }: ReorderJobMapArgs): ReorderJobMapResult => {
        const current: Job[] = [...jobMap[source.droppableId]];
        const next: Job[] = [...jobMap[destination.droppableId]];
        const target: Job = current[source.index];

        //moving to same list
        if (source.droppableId == destination.droppableId){
            const reordered: Job[] = reorder(
                current,
                source.index,
                destination.index,
            );
            const result: JobMap = {
                ...jobMap,
                [source.droppableId]: reordered,
            };
            return {
                jobMap: result
            };
        }

        //moving to different lists
        
        //remove from original
        current.splice(source.index, 1);
        //insert into next
        next.splice(destination.index, 0, target);

        const result: JobMap = {
            ...jobMap,
            [source.droppableId]: current,
            [destination.droppableId]: next,
        };

        return {
            jobMap: result,
        };
    }