// @flow
import type { DraggableId, DraggableLocation } from 'react-beautiful-dnd';

export type Id = string;

export type Job = {|
id: Id,
title: string,
apiId: number
|}

export type CardTitle = {|
    title: string
|}

export type JobMap = {|
    [key: string]: Job[]    
|}