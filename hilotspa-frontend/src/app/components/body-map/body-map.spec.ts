import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MarkedRegion {
  anatomicalRegion: string;
  coordinateX: number;
  coordinateY: number;
  painScore: number;
}

@Component({
  selector: 'app-body-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body-map.html',
  styleUrl: './body-map.css'
})
export class BodyMapComponent {
  @Output() regionsChanged = new EventEmitter<MarkedRegion[]>();

  markedRegions: MarkedRegion[] = [];
  activeView: 'front' | 'back' = 'front';
  selectedRegion: MarkedRegion | null = null;

  // Map of SVG region IDs to human-readable names
  regionNames: Record<string, string> = {
    'head': 'Head',
    'neck': 'Neck',
    'left-shoulder': 'Left Shoulder',
    'right-shoulder': 'Right Shoulder',
    'upper-back': 'Upper Back',
    'lower-back': 'Lower Back',
    'left-elbow': 'Left Elbow',
    'right-elbow': 'Right Elbow',
    'left-wrist': 'Left Wrist',
    'right-wrist': 'Right Wrist',
    'hip': 'Hip',
    'left-knee': 'Left Knee',
    'right-knee': 'Right Knee',
    'left-ankle': 'Left Ankle',
    'right-ankle': 'Right Ankle',
    'chest': 'Chest',
    'abdomen': 'Abdomen',
    'left-thigh': 'Left Thigh',
    'right-thigh': 'Right Thigh',
    'left-calf': 'Right Calf',
    'right-calf': 'Right Calf',
  };

  onRegionClick(event: MouseEvent, regionId: string) {
    const svg = (event.currentTarget as SVGElement).closest('svg')!;
    const rect = svg.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    const existing = this.markedRegions.find(r => r.anatomicalRegion === regionId);
    if (existing) {
      // If already marked, open pain score editor
      this.selectedRegion = existing;
    } else {
      const newRegion: MarkedRegion = {
        anatomicalRegion: regionId,
        coordinateX: x,
        coordinateY: y,
        painScore: 5
      };
      this.markedRegions.push(newRegion);
      this.selectedRegion = newRegion;
    }
    this.regionsChanged.emit(this.markedRegions);
  }

  removeRegion(regionId: string) {
    this.markedRegions = this.markedRegions.filter(r => r.anatomicalRegion !== regionId);
    if (this.selectedRegion?.anatomicalRegion === regionId) {
      this.selectedRegion = null;
    }
    this.regionsChanged.emit(this.markedRegions);
  }

  isMarked(regionId: string): boolean {
    return this.markedRegions.some(r => r.anatomicalRegion === regionId);
  }

  getPainScore(regionId: string): number {
    return this.markedRegions.find(r => r.anatomicalRegion === regionId)?.painScore ?? 0;
  }

  setPainScore(score: number) {
    if (this.selectedRegion) {
      this.selectedRegion.painScore = score;
      this.regionsChanged.emit(this.markedRegions);
    }
  }

  getPainColor(score: number): string {
    if (score <= 3) return '#22c55e';   // green
    if (score <= 6) return '#f97316';   // orange
    return '#ef4444';                    // red
  }

  getRegionName(regionId: string): string {
    return this.regionNames[regionId] ?? regionId;
  }

  closePanel() {
    this.selectedRegion = null;
  }
}