/**
 * One step of the ladder stored data climbs as the model changes. A step is named for the versions
 * it joins (`1-2.migration.ts`), reads the shape at `from` with schemas frozen in its own file, and
 * returns the shape at `to`. It never mutates what it is given, and it validates what it reads —
 * the ladder passes the raw stored value straight through, untyped on purpose.
 */
export interface Migration {
 from: number;
 to: number;
 /**
  * Some stores lost their version marker, and a store is sometimes written by a build with a
  * different idea of what `version` meant, so a step may also recognise its own shape instead of
  * trusting the number alone.
  */
 alsoApplies?: (raw: unknown) => boolean;
 run: (raw: unknown) => unknown;
}
