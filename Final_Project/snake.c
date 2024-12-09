#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <ncurses.h>
#include <string.h>
#include <unistd.h>

#define DELAY 80000 // Microseconds between screen updates
#define INITIAL_SNAKE_LENGTH 3

typedef struct {
    int x;
    int y;
} Position;

typedef struct {
    Position *body;   // Dynamic array of body segments
    int length;       // Current length
    int max_length;   // Allocated size
    int dx;           // Movement in x direction
    int dy;           // Movement in y direction
} Snake;

static int max_y, max_x; // Terminal window size
static Position food;
static Snake snake;
static int score = 0;

void init_game();
void init_snake();
void place_food();
void draw_scene();
int update_snake();
int check_collision();
void end_game(const char *msg);
void cleanup();

int main() {
    srand((unsigned int)time(NULL));
    initscr();            // Initialize ncurses
    noecho();             // Don't print input chars
    curs_set(FALSE);      // Hide the cursor
    keypad(stdscr, TRUE); // Enable arrow keys
    nodelay(stdscr, TRUE); // Non-blocking input
    getmaxyx(stdscr, max_y, max_x);

    init_game();
    draw_scene();

    int ch;
    while (1) {
        ch = getch();
        switch (ch) {
            case KEY_UP:
                if (snake.dy == 1) break; // Prevent reverse direction
                snake.dx = 0; snake.dy = -1;
                break;
            case KEY_DOWN:
                if (snake.dy == -1) break;
                snake.dx = 0; snake.dy = 1;
                break;
            case KEY_LEFT:
                if (snake.dx == 1) break;
                snake.dx = -1; snake.dy = 0;
                break;
            case KEY_RIGHT:
                if (snake.dx == -1) break;
                snake.dx = 1; snake.dy = 0;
                break;
            case 'q': // Quit
            case 'Q':
                end_game("Game Quit");
                break;
            default:
                break;
        }

        if (!update_snake()) {
            end_game("You hit the wall or yourself!");
            break;
        }

        draw_scene();
        usleep(DELAY);
    }

    cleanup();
    return 0;
}

void init_game() {
    init_snake();
    place_food();
    score = 0;
}

void init_snake() {
    snake.length = INITIAL_SNAKE_LENGTH;
    snake.max_length = 100; // Max length you allow
    snake.body = (Position *)malloc(snake.max_length * sizeof(Position));

    // Start in the center of the screen
    snake.body[0].x = max_x / 2;
    snake.body[0].y = max_y / 2;

    // Initialize going right
    snake.dx = 1;
    snake.dy = 0;

    // Place the remaining initial segments to the left
    for (int i = 1; i < snake.length; i++) {
        snake.body[i].x = snake.body[i-1].x - 1;
        snake.body[i].y = snake.body[i-1].y;
    }
}

void place_food() {
    // Place food in a random position within the boundaries
    // Make sure it's not on the snake
    int valid = 0;
    while (!valid) {
        food.x = rand() % (max_x - 2) + 1; // within boundaries
        food.y = rand() % (max_y - 2) + 1;
        valid = 1;
        for (int i = 0; i < snake.length; i++) {
            if (snake.body[i].x == food.x && snake.body[i].y == food.y) {
                valid = 0;
                break;
            }
        }
    }
}

int update_snake() {
    // Move snake head
    Position new_head;
    new_head.x = snake.body[0].x + snake.dx;
    new_head.y = snake.body[0].y + snake.dy;

    // Check for wall collision
    if (new_head.x <= 0 || new_head.x >= max_x-1 ||
        new_head.y <= 0 || new_head.y >= max_y-1) {
        return 0;
    }

    // Check for self-collision
    for (int i = 0; i < snake.length; i++) {
        if (snake.body[i].x == new_head.x && snake.body[i].y == new_head.y) {
            return 0;
        }
    }

    // Move body: shift all segments
    for (int i = snake.length - 1; i > 0; i--) {
        snake.body[i] = snake.body[i-1];
    }

    snake.body[0] = new_head;

    // Check if food is eaten
    if (new_head.x == food.x && new_head.y == food.y) {
        // Grow the snake
        if (snake.length < snake.max_length) {
            snake.length++;
            // The new tail segment takes the place of the last segment duplicated
            snake.body[snake.length - 1] = snake.body[snake.length - 2];
        }
        score++;
        place_food();
    }

    return 1;
}

void draw_scene() {
    clear();

    // Draw boundaries
    for (int i = 0; i < max_x; i++) {
        mvprintw(0, i, "#");
        mvprintw(max_y-1, i, "#");
    }
    for (int i = 0; i < max_y; i++) {
        mvprintw(i, 0, "#");
        mvprintw(i, max_x-1, "#");
    }

    // Draw food
    mvprintw(food.y, food.x, "F");

    // Draw snake
    for (int i = 0; i < snake.length; i++) {
        if (i == 0) {
            mvprintw(snake.body[i].y, snake.body[i].x, "O"); // Head
        } else {
            mvprintw(snake.body[i].y, snake.body[i].x, "o"); // Body
        }
    }

    // Display score
    mvprintw(0, 2, "Score: %d", score);
    refresh();
}

void end_game(const char *msg) {
    nodelay(stdscr, FALSE); // Re-enable blocking input for end
    clear();
    mvprintw(max_y/2, (max_x - (int)strlen(msg))/2, "%s", msg);
    mvprintw(max_y/2 + 1, (max_x - 20)/2, "Final Score: %d", score);
    mvprintw(max_y/2 + 3, (max_x - 35)/2, "Press any key to exit...");
    refresh();
    getch();
    cleanup();
    endwin();
    exit(EXIT_SUCCESS);
}

void cleanup() {
    free(snake.body);
    endwin();
}
