public class Codec {
    // Encode a tree into a single string
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        serializeHelper(root, sb);
        return sb.toString();
    }

    private void serializeHelper(TreeNode root, StringBuilder sb) {
        if (root == null) {
            sb.append('X').append(',');
            return;
        }
        sb.append(root.val).append(',');
        serializeHelper(root.left, sb);
        serializeHelper(root.right, sb);
    }

    // Decodes your encoded data to tree
    public TreeNode deserialize(String data) {
        Queue<String> queue = new LinkedList<>();
        queue.addAll(Arrays.asList(data.split(",")));
        return deserializeHelper(queue);
    }

    private TreeNode deserializeHelper(Queue<String> queue) {
        String current = queue.poll();
        if (current.equals("X"))
            return null;
        TreeNode node = new TreeNode(Integer.valueOf(current));
        node.left = deserializeHelper(queue);
        node.right = deserializeHelper(queue);
        return node;
    }
}

// nested iterator

public class NestedIterator implements Iterator<Integer> {

    private Stack<NestedIterator> stack;

    public NestedIterator(List<NestedIterator> nestedIterator) {
        stack = new Stack<>();
        flattenList(nestedList);
    }

    @Override
    public Integer next() {
        return hasNext() ? stack.pop().getInteger() : null;
    }

    @Override
    boolean hasNext() {
        while (!stack.isEmpty()) {
            if (stack.peek().isInteger())
                return true;
            flattenList(stack.pop().getList());
        }
        return false;
    }

    private void flatten(List<NestedInteger> list) {
        for (int i = list.size() - 1; i >= 0; i--) {
            stack.push(list.get(i));
        }
    }
}