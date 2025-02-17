import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Button } from '@/components/shadcn/button';
import { Plus, Armchair, X } from 'lucide-react';

const TheaterLayoutDesigner = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      rows: 6,
      columns: 6,
      startRow: 'A',
      startNumber: 1,
      selectedSeats: new Set()
    }
  ]);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        rows: 6,
        columns: 6,
        startRow: 'A',
        // By default, shift startNumber to be the next seat # after the last section’s highest seat
        startNumber:
          prev[prev.length - 1]?.startNumber + prev[prev.length - 1]?.columns || 1,
        selectedSeats: new Set()
      }
    ]);
  };

  const removeSection = (id: number) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  const updateSection = (id: number, field: string, value: any) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const toggleSeatSelection = (sectionId: number, seatId: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          const newSelectedSeats = new Set(section.selectedSeats);
          if (newSelectedSeats.has(seatId)) {
            newSelectedSeats.delete(seatId);
          } else {
            newSelectedSeats.add(seatId);
          }
          return { ...section, selectedSeats: newSelectedSeats };
        }
        return section;
      })
    );
  };

  // Find the global row range across all sections (e.g., from A up to the highest row letter)
  const getGlobalRowRange = () => {
    const minRowChar = Math.min(...sections.map((s) => s.startRow.charCodeAt(0)));
    const maxRowChar = Math.max(
      ...sections.map((s) => s.startRow.charCodeAt(0) + s.rows - 1)
    );
    return {
      startChar: String.fromCharCode(minRowChar),
      endChar: String.fromCharCode(maxRowChar)
    };
  };

  // Renders seats for one rowChar (e.g. 'A') in a single pass across all sections
  const renderRowAcrossSections = (rowChar: string) => {
    return sections.map((section, index) => {
      const rowIndex = rowChar.charCodeAt(0) - section.startRow.charCodeAt(0);
      if (rowIndex < 0 || rowIndex >= section.rows) {
        // This section doesn't have that row
        return null;
      }

      // Build the seats for this row in the given section
      const seats = [];
      for (let c = 0; c < section.columns; c++) {
        const seatNumber = section.startNumber + c;
        const seatId = `${rowChar}${seatNumber}`;
        const isSelected = section.selectedSeats.has(seatId);

        seats.push(
          <div
            key={seatId}
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => toggleSeatSelection(section.id, seatId)}
          >
            <Armchair
              className={`w-8 h-8 transition-colors ${
                isSelected ? 'text-blue-600' : 'text-gray-400'
              }`}
            />
            {isSelected && (
              <span className="text-xs font-medium">
                {seatId}
              </span>
            )}
          </div>
        );
      }

      // Add a small gap between sections
      return (
        <div key={`sect-${section.id}`} className="flex items-center">
          {index > 0 && <div className="mx-5" />} {/* Horizontal gap between sections */}
          {seats}
        </div>
      );
    });
  };

  // Merge all rows (A, B, C, etc.) from the earliest to the latest
  const renderAllRows = () => {
    const { startChar, endChar } = getGlobalRowRange();
    const rows = [];

    for (
      let rowCode = startChar.charCodeAt(0);
      rowCode <= endChar.charCodeAt(0);
      rowCode++
    ) {
      const rowChar = String.fromCharCode(rowCode);
      // For each row, combine seats from each section
      const rowSegments = renderRowAcrossSections(rowChar);

      // If all segments are null, skip
      if (rowSegments.every((seg) => seg === null)) {
        continue;
      }

      rows.push(
        <div key={`row-${rowChar}`} className="flex items-center gap-8">
          {/* Row label on the far left */}
          <div className="w-8 flex items-center justify-center font-medium">
            {rowChar}
          </div>
          {/* The seats from all sections that have this row */}
          <div className="flex">{rowSegments}</div>
        </div>
      );
    }

    return rows;
  };

  // Single row of seat numbers at bottom across all sections
  const renderBottomNumbers = () => {
    return (
      <div className="flex items-center mt-5">
        {/* Keep a blank "spacer" at left so numbers align under seats. 
            The width should match the row label above, e.g. w-8. */}
        <div className="w-16" />
        {/* Then the seat-number groups from each section */}
        <div className="flex items-center">
          {sections.map((section, i) => {
            const nums = [];
            for (let c = 0; c < section.columns; c++) {
              const seatNumber = section.startNumber + c;
              nums.push(
                <div
                  key={`num-${section.id}-${seatNumber}`}
                  className="w-8 text-center text-sm font-medium"
                >
                  {seatNumber}
                </div>
              );
            }
            return (
              <div key={`nums-${section.id}`} className="flex items-center">
                {i > 0 && <div className="mx-5" />} {/* Gap between sections */}
                {nums}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Theater Layout Designer</CardTitle>
          <Button onClick={addSection} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Sections Controls */}
        <div className="flex flex-wrap justify-center gap-3">
          {sections.map((section, index) => (
            <Card key={section.id} className="p-4 w-fit">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Section {index + 1}</h3>
                {sections.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeSection(section.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label>Rows</Label>
                  <Input
                    type="number"
                    value={section.rows}
                    onChange={(e) =>
                      updateSection(section.id, 'rows', Number(e.target.value))
                    }
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Columns</Label>
                  <Input
                    type="number"
                    value={section.columns}
                    onChange={(e) =>
                      updateSection(section.id, 'columns', Number(e.target.value))
                    }
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Row</Label>
                  <Input
                    type="text"
                    value={section.startRow}
                    onChange={(e) =>
                      updateSection(section.id, 'startRow', e.target.value.toUpperCase())
                    }
                    maxLength={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Number</Label>
                  <Input
                    type="number"
                    value={section.startNumber}
                    onChange={(e) =>
                      updateSection(section.id, 'startNumber', Number(e.target.value))
                    }
                    min="1"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Layout Preview */}
        <div className="mt-8 flex flex-col items-center gap-10">
          {/* Screen */}
          <div className="w-full max-w-3xl h-8 bg-primary rounded-sm flex items-center justify-center text-white">
            Screen
          </div>

          {/* Combined rows & columns below the screen, centered */}
          <div className="flex flex-col gap-2.5 items-center p-4 rounded-sm">
            {/* All rows */}
            {renderAllRows()}

            {/* Bottom seat numbers */}
            {renderBottomNumbers()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TheaterLayoutDesigner;
