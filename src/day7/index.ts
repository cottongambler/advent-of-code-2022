import { Day } from "../day";

type FolderSize = {
    name: string;
    size: number;
}

type File = {
    name: string;
    size: number;
}
class Folder {
    public name: string;
    public files: File[];

    private parent: Folder | undefined;
    private subfolders: Folder[];

    constructor(name: string = '/', parent: Folder | undefined = undefined) {
        this.parent = parent;
        this.subfolders = [];

        this.name = name;
        this.files = [];
    }

    getParent(): Folder | undefined {
        return this.parent;
    }

    getSubfolder(name: string): Folder | undefined {
        return this.subfolders.find(child => child.name === name);
    }

    getSubfolders(): Folder[] {
        return this.subfolders;
    }

    addSubfolder(name: string) {
        const child = new Folder(name, this);
        this.subfolders.push(child);
    }

    addFile(name: string, size: string) {
        const file = {name, size: Number(size)};
        this.files.push(file);
    }

    getFileSize() {
        const fileSize = this.files
            .map(file => file.size)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return fileSize;
    }

    getTotalSize(folder: Folder = this): number {        
        let childSize = 0;
        for(let i = 0; i < folder.subfolders.length; i++) {
            childSize += folder.subfolders[i].getTotalSize();
        }
        return folder.getFileSize() + childSize;
    }
}
class Day7 extends Day {
    rootFolder: Folder | undefined = undefined;
    currentFolder: Folder | undefined = undefined;

    constructor(){
        super(7);
    }

    solveForPartOne(input: string): string {
        this.initFileSystem(input);
        
        const folders: FolderSize[] = this.filterFoldersByMaxSize(this.rootFolder, 100000);
        const sumSizes = folders.reduce((accumulator, directory) => accumulator + directory.size, 0);
        
        return sumSizes.toString();
    }

    solveForPartTwo(input: string): string {
        this.initFileSystem(input);
        
        const usedSpace = (this.rootFolder?.getTotalSize() ?? 0);
        const unusedSpace = 70000000 - usedSpace;
        const neededSpace = 30000000 - unusedSpace;
        
        const folders: FolderSize[] = this.filterFoldersByMinSize(this.rootFolder, neededSpace);
        const folderSizes = folders.map(folder => folder.size);
        
        return Math.min(...folderSizes).toString();
    }

    initFileSystem(input: string) {
        const lines = input.split('\n');
        
        for(let i = 0; i < lines.length; i++) {
            const line = lines[i].split(' ');
            
            if(line[0] === '$') {
                if(line[1] === 'cd') this.cd(line[2]);
            }
            else if(line[0] === 'dir') this.currentFolder?.addSubfolder(line[1]);
            else this.currentFolder?.addFile(line[1], line[0]);
        }
    }

    cd(path: string) {
        if(path === '..') {
            const parent = this.currentFolder?.getParent();
            if (parent) this.currentFolder = parent;
        }
        else {
            if(!this.currentFolder && path === '/') {
                this.currentFolder = new Folder();
                this.rootFolder = this.currentFolder;
            }
            else {
                this.currentFolder = this.currentFolder?.getSubfolder(path);
            }
        }
    }

    filterFoldersByMaxSize(
        folderToStart: Folder | undefined, 
        maxSize: number 
    ): FolderSize[] {
        if(!folderToStart) return [];

        const folders: FolderSize[] = [];
        this.filterMaxSize(folders, folderToStart, maxSize);

        return folders;
    }

    private filterMaxSize(folders: FolderSize[], currentFolder: Folder, maxSize: number) {
        const totalSize = currentFolder.getTotalSize();
        if (totalSize <= maxSize) {
            folders.push({name: currentFolder.name, size: totalSize})
        };

        for(let i = 0; i < currentFolder.getSubfolders().length; i++) {
            this.filterMaxSize(folders, currentFolder.getSubfolders()[i], maxSize);
        }
    }

    filterFoldersByMinSize(
        folderToStart: Folder | undefined, 
        minSize: number
    ): FolderSize[] {
        if(!folderToStart) return [];

        const folders: FolderSize[] = [];
        this.filterMinSize(folders, folderToStart, minSize);

        return folders;
    }

    private filterMinSize(folders: FolderSize[], currentFolder: Folder, minSize: number) {
        const totalSize = currentFolder.getTotalSize();
        if (totalSize >= minSize) {
            folders.push({name: currentFolder.name, size: totalSize})
        };

        for(let i = 0; i < currentFolder.getSubfolders().length; i++) {
            this.filterMinSize(folders, currentFolder.getSubfolders()[i], minSize);
        }
    }
}

export default new Day7;