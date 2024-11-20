% Define the maze
maze([[0, 1, 0, 0],
      [0, 1, 0, 1],
      [0, 0, 0, 0],
      [1, 1, 0, 0]]).

% Entry point to find a path
find_path(Start, End, Path) :-
    valid_start_end(Start, End), % Validate the start and end points
    path(Start, End, [Start], RevPath),
    reverse(RevPath, Path). % Reverse the path for proper order

% Base case: If Current == End, weve found a path
path(End, End, Visited, Visited).

% Recursive case: Explore neighboring cells
path(Current, End, Visited, Path) :-
    move(Current, Next),      % Get a valid next move
    \+ member(Next, Visited), % Ensure we dont revisit cells
    path(Next, End, [Next|Visited], Path).

% Define possible moves (right, left, down, up)
move([X, Y], [X, Y1]) :- Y1 is Y + 1, valid_move(X, Y1).
move([X, Y], [X, Y1]) :- Y1 is Y - 1, valid_move(X, Y1).
move([X, Y], [X1, Y]) :- X1 is X + 1, valid_move(X1, Y).
move([X, Y], [X1, Y]) :- X1 is X - 1, valid_move(X1, Y).

% Check if the move is valid
valid_move(X, Y) :-
    maze(Maze),
    nth0(X, Maze, Row),
    nth0(Y, Row, Cell),
    Cell == 0. % Only move to open cells

% Validate the start and end points
valid_start_end(Start, End) :-
    maze(Maze),
    within_bounds(Start, Maze),
    within_bounds(End, Maze),
    valid_move_cell(Start),
    valid_move_cell(End).

% Check if a point is within bounds of the maze
within_bounds([X, Y], Maze) :-
    length(Maze, Rows),
    nth0(X, Maze, Row),
    length(Row, Cols),
    X >= 0, X < Rows,
    Y >= 0, Y < Cols.

% Check if a specific cell is valid
valid_move_cell([X, Y]) :-
    maze(Maze),
    nth0(X, Maze, Row),
    nth0(Y, Row, Cell),
    Cell == 0.
