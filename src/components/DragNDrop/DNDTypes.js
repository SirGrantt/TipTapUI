// @flow

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