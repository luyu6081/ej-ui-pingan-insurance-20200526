// TODO: 这里需要和具体业务设计同步
export const FileType = {}
FileType[FileType['Text'] = 1] = 'Text'
FileType[FileType['Archive'] = 2] = 'Archive'
FileType[FileType['Image'] = 3] = 'Image'

export const TaskType = {}
TaskType[TaskType['Wait'] = 1] = 'Wait'
TaskType[TaskType['Starting'] = 2] = 'Starting'
TaskType[TaskType['Success'] = 3] = 'Success'
TaskType[TaskType['Error'] = 4] = 'Error'
